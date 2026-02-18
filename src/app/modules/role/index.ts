import express from "express";
import { CreateRole, DeleteRole, GetRoleById, GetRoles, UpdateRole } from "./controller.js";
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
  authorizeRoles(Role.SUPER_ADMIN, Role.ADMIN),
  requirePermission(PERMISSIONS.ROLE.CREATE),
  joiValidator(validator.role.create),
  CreateRole
);
router.get(
  "/",
  verifyToken,
  authorizeRoles(Role.SUPER_ADMIN, Role.ADMIN),
  requirePermission(PERMISSIONS.ROLE.READ),
  GetRoles
);
router.get(
  "/:roleId",
  verifyToken,
  authorizeRoles(Role.SUPER_ADMIN, Role.ADMIN),
  requirePermission(PERMISSIONS.ROLE.READ),
  joiValidator(validator.role.idParam),
  GetRoleById
);
router.put(
  "/:roleId",
  verifyToken,
  authorizeRoles(Role.SUPER_ADMIN, Role.ADMIN),
  requirePermission(PERMISSIONS.ROLE.UPDATE),
  joiValidator(validator.role.idParam),
  joiValidator(validator.role.update),
  UpdateRole
);
router.delete(
  "/:roleId",
  verifyToken,
  authorizeRoles(Role.SUPER_ADMIN, Role.ADMIN),
  requirePermission(PERMISSIONS.ROLE.DELETE),
  joiValidator(validator.role.idParam),
  DeleteRole
);
    
export default router;
