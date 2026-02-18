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
import { requirePermission } from "../../middleware/requirePermission.js";
import { Role } from "./model.js";
import validator, { joiValidator } from "../../utils/validator.js";
import { PERMISSIONS } from "../../utils/permissions.js";



const router = express.Router();

router
  .route("/profile")
  .get(
    verifyToken,
    authorizeRoles(Role.SUPER_ADMIN, Role.ADMIN, Role.SCHOOL_ADMIN, Role.SUPPORT),
    requirePermission(PERMISSIONS.ADMIN.READ),
    GetProfile
  );

router
  .route("/register")
  .post(
    verifyToken,
    authorizeRoles(Role.SUPER_ADMIN),
    requirePermission(PERMISSIONS.ADMIN.CREATE),
    joiValidator(validator.admin.register),
    Create
  );

router.route("/login").post(joiValidator(validator.admin.login), Login);

router
  .route("/logout")
  .get(
    verifyToken,
    authorizeRoles(Role.SUPER_ADMIN, Role.ADMIN, Role.SCHOOL_ADMIN, Role.SUPPORT),
    requirePermission(PERMISSIONS.ADMIN.LOGOUT),
    Logout
  );



//router.route("/forget-password").post(joiValidator(validator.admin.forgotPassword), ForgetPassword);
router
  .route("/reset-password")
  .post(joiValidator(validator.admin.resetPassword), ResetPassword);

export default router;
