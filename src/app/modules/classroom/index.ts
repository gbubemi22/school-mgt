import express from "express";
import { CreateClassroom, DeleteClassroom, GetClassroomById, GetClassrooms, UpdateClassroom } from "./controller.js";
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
  requirePermission(PERMISSIONS.CLASSROOM.CREATE),
  joiValidator(validator.classroom.create),
  CreateClassroom
);
router.get(
  "/:schoolId",
  verifyToken,
  authorizeRoles(Role.SUPER_ADMIN, Role.ADMIN, Role.SCHOOL_ADMIN, Role.SUPPORT),
  requirePermission(PERMISSIONS.CLASSROOM.READ),
  joiValidator(validator.classroom.schoolParam),
  GetClassrooms
);
router.get(
  "/classroom/:classroomId",
  verifyToken,
  authorizeRoles(Role.SUPER_ADMIN, Role.ADMIN, Role.SCHOOL_ADMIN, Role.SUPPORT),
  requirePermission(PERMISSIONS.CLASSROOM.READ),
  joiValidator(validator.classroom.idParam),
  GetClassroomById
);
router.put(
  "/classroom/:classroomId",
  verifyToken,
  authorizeRoles(Role.SUPER_ADMIN, Role.ADMIN, Role.SCHOOL_ADMIN),
  requirePermission(PERMISSIONS.CLASSROOM.UPDATE),
  joiValidator(validator.classroom.idParam),
  joiValidator(validator.classroom.update),
  UpdateClassroom
);
router.delete(
  "/classroom/:classroomId",
  verifyToken,
  authorizeRoles(Role.SUPER_ADMIN, Role.ADMIN),
  requirePermission(PERMISSIONS.CLASSROOM.DELETE),
  joiValidator(validator.classroom.idParam),
  DeleteClassroom
);

export default router;
