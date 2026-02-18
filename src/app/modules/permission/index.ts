import express from "express";
import { CreatePermission, DeletePermission, GetPermissionById, GetPermissions, UpdatePermission } from "./controller.js";
import { verifyToken } from "../../middleware/auth.js";
import { authorizeRoles } from "../../middleware/checkRole.js";
import { requirePermission } from "../../middleware/requirePermission.js";
import validator, { joiValidator } from "../../utils/validator.js";
const router = express.Router();

/**
 * @openapi
 * /v1/permission:
 *   post:
 *     tags:
 *       - Permission
 *     summary: Create permission
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post(
    "/",
    verifyToken,
    authorizeRoles("SUPER_ADMIN", "ADMIN"),
    joiValidator(validator.permission.create),
    CreatePermission
);
/**
 * @openapi
 * /v1/permission:
 *   get:
 *     tags:
 *       - Permission
 *     summary: Get permissions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 */
router.get(
    "/",
    verifyToken,
    authorizeRoles("SUPER_ADMIN", "ADMIN"),
    GetPermissions
);
/**
 * @openapi
 * /v1/permission/{permissionId}:
 *   get:
 *     tags:
 *       - Permission
 *     summary: Get permission by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: permissionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 */
router.get(
    "/:permissionId",
    verifyToken,
    authorizeRoles("SUPER_ADMIN", "ADMIN"),
    joiValidator(validator.permission.idParam),
    GetPermissionById
);
/**
 * @openapi
 * /v1/permission/{permissionId}:
 *   put:
 *     tags:
 *       - Permission
 *     summary: Update permission
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: permissionId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.put(
    "/:permissionId",
    verifyToken,
    authorizeRoles("SUPER_ADMIN", "ADMIN"),
    joiValidator(validator.permission.idParam),
    joiValidator(validator.permission.update),
    UpdatePermission
);
/**
 * @openapi
 * /v1/permission/{permissionId}:
 *   delete:
 *     tags:
 *       - Permission
 *     summary: Delete permission
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: permissionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.delete(
    "/:permissionId",
    verifyToken,
    authorizeRoles("SUPER_ADMIN", "ADMIN"),
    joiValidator(validator.permission.idParam),
    DeletePermission
);

export default router;
