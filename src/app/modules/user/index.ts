import express from "express";
import { ForgotPassword, ResetPassword, ChangePassword, CreateUser, LoginUser, LogoutUser } from "./controller.js";
import { verifyToken } from "../../middleware/auth.js";
import validator, { joiValidator } from "../../utils/validator.js";

const router = express.Router();


/**
 * @openapi
 * /v1/auth/register:
 *   post:
 *     tags:
 *       - User
 *     summary: Register a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 */
router.post("/register", joiValidator(validator.user.register), CreateUser);
/**
 * @openapi
 * /v1/auth/login:
 *   post:
 *     tags:
 *       - User
 *     summary: Login user
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
router.post("/login", joiValidator(validator.user.login), LoginUser);
/**
 * @openapi
 * /v1/auth/logout:
 *   post:
 *     tags:
 *       - User
 *     summary: Logout user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/logout",
  verifyToken,

  LogoutUser
);
/**
 * @openapi
 * /v1/auth/forgot-password:
 *   post:
 *     tags:
 *       - User
 *     summary: Request password reset OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 */
router.post("/forgot-password", joiValidator(validator.user.forgotPassword), ForgotPassword);
/**
 * @openapi
 * /v1/auth/reset-password:
 *   post:
 *     tags:
 *       - User
 *     summary: Reset password
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
router.post("/reset-password", joiValidator(validator.user.resetPassword), ResetPassword);
/**
 * @openapi
 * /v1/auth/change-password:
 *   post:
 *     tags:
 *       - User
 *     summary: Change password
 *     security:
 *       - bearerAuth: []
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
 */
router.post(
  "/change-password",
  verifyToken,

  joiValidator(validator.user.changePassword),
  ChangePassword
);

export default router;
