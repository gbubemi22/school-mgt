import express from "express";
import { CreatePermission, DeletePermission, GetPermissionById, GetPermissions, UpdatePermission } from "./controller.js";
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
  requirePermission(PERMISSIONS.PERMISSION.CREATE),
  joiValidator(validator.permission.create),
  CreatePermission
);
router.get(
  "/",
  verifyToken,
  authorizeRoles(Role.SUPER_ADMIN, Role.ADMIN),
  requirePermission(PERMISSIONS.PERMISSION.READ),
  GetPermissions
);
router.get(
  "/:permissionId",
  verifyToken,
  authorizeRoles(Role.SUPER_ADMIN, Role.ADMIN),
  requirePermission(PERMISSIONS.PERMISSION.READ),
  joiValidator(validator.permission.idParam),
  GetPermissionById
);
router.put(
  "/:permissionId",
  verifyToken,
  authorizeRoles(Role.SUPER_ADMIN, Role.ADMIN),
  requirePermission(PERMISSIONS.PERMISSION.UPDATE),
  joiValidator(validator.permission.idParam),
  joiValidator(validator.permission.update),
  UpdatePermission
);
router.delete(
  "/:permissionId",
  verifyToken,
  authorizeRoles(Role.SUPER_ADMIN, Role.ADMIN),
  requirePermission(PERMISSIONS.PERMISSION.DELETE),
  joiValidator(validator.permission.idParam),
  DeletePermission
);

export default router;
