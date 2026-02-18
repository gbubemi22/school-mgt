import express from "express";
import { CreateRole, DeleteRole, GetRoleById, GetRoles, UpdateRole } from "./controller.js";
import { verifyToken } from "../../middleware/auth.js";
import { authorizeRoles } from "../../middleware/checkRole.js";
import { requirePermission } from "../../middleware/requirePermission.js";
import validator, { joiValidator } from "../../utils/validator.js";


const router = express.Router();


/**
 * @openapi
 * /v1/role:
 *   post:
 *     tags:
 *       - Role
 *     summary: Create role
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
  joiValidator(validator.role.create),
  CreateRole
);
/**
 * @openapi
 * /v1/role:
 *   get:
 *     tags:
 *       - Role
 *     summary: Get roles
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
  // verifyToken,
  // authorizeRoles("SUPER_ADMIN", "ADMIN"),

  GetRoles
);
/**
 * @openapi
 * /v1/role/{roleId}:
 *   get:
 *     tags:
 *       - Role
 *     summary: Get role by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
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
  "/:roleId",
  verifyToken,
  authorizeRoles("SUPER_ADMIN", "ADMIN"),

  joiValidator(validator.role.idParam),
  GetRoleById
);
/**
 * @openapi
 * /v1/role/{roleId}:
 *   put:
 *     tags:
 *       - Role
 *     summary: Update role
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
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
  "/:roleId",
  verifyToken,
  authorizeRoles("SUPER_ADMIN", "ADMIN"),

  joiValidator(validator.role.idParam),
  joiValidator(validator.role.update),
  UpdateRole
);
/**
 * @openapi
 * /v1/role/{roleId}:
 *   delete:
 *     tags:
 *       - Role
 *     summary: Delete role
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
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
  "/:roleId",
  verifyToken,
  authorizeRoles("SUPER_ADMIN", "ADMIN"),

  joiValidator(validator.role.idParam),
  DeleteRole
);

export default router;
