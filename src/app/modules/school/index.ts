import express from "express";
import { CreateSchool, DeleteSchool, GetSchoolById, GetSchools, UpdateSchool } from "./controller.js";
import { verifyToken } from "../../middleware/auth.js";
import { authorizeRoles } from "../../middleware/checkRole.js";
import { requirePermission } from "../../middleware/requirePermission.js";
import validator, { joiValidator } from "../../utils/validator.js";
import { PERMISSIONS } from "../../utils/permissions.js";
import { Role } from "../admin/model.js";


const router = express.Router();

router.post(
  "/",
  verifyToken,
  authorizeRoles(Role.SUPER_ADMIN, Role.ADMIN, Role.SCHOOL_ADMIN),
  requirePermission(PERMISSIONS.SCHOOL.CREATE),
  joiValidator(validator.school.create),
  CreateSchool
);
router.get(
  "/",
  verifyToken,
  authorizeRoles(Role.SUPER_ADMIN, Role.ADMIN, Role.SCHOOL_ADMIN, Role.SUPPORT),
  requirePermission(PERMISSIONS.SCHOOL.READ),
  GetSchools
);
router.get(
  "/:schoolId",
  verifyToken,
  authorizeRoles(Role.SUPER_ADMIN, Role.ADMIN, Role.SCHOOL_ADMIN, Role.SUPPORT),
  requirePermission(PERMISSIONS.SCHOOL.READ),
  joiValidator(validator.school.idParam),
  GetSchoolById
);
router.put(
  "/:schoolId",
  verifyToken,
  authorizeRoles(Role.SUPER_ADMIN, Role.ADMIN, Role.SCHOOL_ADMIN),
  requirePermission(PERMISSIONS.SCHOOL.UPDATE),
  joiValidator(validator.school.idParam),
  joiValidator(validator.school.update),
  UpdateSchool
);
router.delete(
  "/:schoolId",
  verifyToken,
  authorizeRoles(Role.SUPER_ADMIN, Role.ADMIN),
  requirePermission(PERMISSIONS.SCHOOL.DELETE),
  joiValidator(validator.school.idParam),
  DeleteSchool
);

export default router;
    
