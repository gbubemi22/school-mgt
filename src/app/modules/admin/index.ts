import express from "express";
import {
  Create,
  //ForgetPassword,
  GetProfile,
  Login,
  Logout,
  ResetPassword,
} from "./controller.js";
import { verifyToken } from "../../middleware/auth.js";
import { authorizeRoles } from "../../middleware/checkRole.js";

import validator, { joiValidator } from "../../utils/validator.js";



const router = express.Router();

/**
 * @openapi
 * /v1/admin/auth/profile:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get admin profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 */
router
  .route("/profile")
  .get(
    verifyToken,
    authorizeRoles("SUPER_ADMIN", "ADMIN", "SCHOOL_ADMIN", "SUPPORT"),
   
    GetProfile
  );

/**
 * @openapi
 * /v1/admin/auth/register:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Register an admin
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
router
  .route("/register")
  .post(
    verifyToken,
    authorizeRoles("SUPER_ADMIN"),
   
    joiValidator(validator.admin.register),
    Create
  );

/**
 * @openapi
 * /v1/admin/auth/login:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Admin login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request
 */
router.route("/login").post(joiValidator(validator.admin.login), Login);

/**
 * @openapi
 * /v1/admin/auth/logout:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Admin logout
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 */
router
  .route("/logout")
  .get(
    verifyToken,
    authorizeRoles("SUPER_ADMIN", "ADMIN", "SCHOOL_ADMIN", "SUPPORT"),
   
    Logout
  );



//router.route("/forget-password").post(joiValidator(validator.admin.forgotPassword), ForgetPassword);
/**
 * @openapi
 * /v1/admin/auth/reset-password:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Reset admin password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request
 */
router
  .route("/reset-password")
  .post(joiValidator(validator.admin.resetPassword), ResetPassword);

export default router;
