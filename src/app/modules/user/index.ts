import express from "express";
import { ForgotPassword, ResetPassword, ChangePassword, CreateUser, LoginUser, LogoutUser } from "./controller.js";
import { verifyToken } from "../../middleware/auth.js";
import { requirePermission } from "../../middleware/requirePermission.js";
import validator, { joiValidator } from "../../utils/validator.js";
import { PERMISSIONS } from "../../utils/permissions.js";

const router = express.Router();


router.post("/register", joiValidator(validator.user.register), CreateUser);
router.post("/login", joiValidator(validator.user.login), LoginUser);
router.post(
  "/logout",
  verifyToken,
  requirePermission(PERMISSIONS.USER.LOGOUT),
  LogoutUser
);
router.post("/forgot-password", joiValidator(validator.user.forgotPassword), ForgotPassword);
router.post("/reset-password", joiValidator(validator.user.resetPassword), ResetPassword);
router.post(
  "/change-password",
  verifyToken,
  requirePermission(PERMISSIONS.USER.CHANGE_PASSWORD),
  joiValidator(validator.user.changePassword),
  ChangePassword
);

export default router;
