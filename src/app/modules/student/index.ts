import express from "express";
import { CreateStudent, DeleteStudent, EnrollStudent, GetStudentById, GetStudents, TransferStudent, UpdateStudent } from "./controller.js";
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
  requirePermission(PERMISSIONS.STUDENT.CREATE),
  joiValidator(validator.student.create),
  CreateStudent
);
router.get(
  "/:schoolId",
  verifyToken,
  authorizeRoles(Role.SUPER_ADMIN, Role.ADMIN, Role.SCHOOL_ADMIN, Role.SUPPORT),
  requirePermission(PERMISSIONS.STUDENT.READ),
  joiValidator(validator.student.schoolParam),
  GetStudents
);
router.get(
  "/student/:studentId",
  verifyToken,
  authorizeRoles(Role.SUPER_ADMIN, Role.ADMIN, Role.SCHOOL_ADMIN, Role.SUPPORT),
  requirePermission(PERMISSIONS.STUDENT.READ),
  joiValidator(validator.student.idParam),
  GetStudentById
);
router.put(
  "/student/:studentId",
  verifyToken,
  authorizeRoles(Role.SUPER_ADMIN, Role.ADMIN, Role.SCHOOL_ADMIN),
  requirePermission(PERMISSIONS.STUDENT.UPDATE),
  joiValidator(validator.student.idParam),
  joiValidator(validator.student.update),
  UpdateStudent
);
router.delete(
  "/student/:studentId",
  verifyToken,
  authorizeRoles(Role.SUPER_ADMIN, Role.ADMIN),
  requirePermission(PERMISSIONS.STUDENT.DELETE),
  joiValidator(validator.student.idParam),
  DeleteStudent
);
router.post(
  "/student/:studentId/enroll",
  verifyToken,
  authorizeRoles(Role.SUPER_ADMIN, Role.ADMIN, Role.SCHOOL_ADMIN),
  requirePermission(PERMISSIONS.STUDENT.ENROLL),
  joiValidator(validator.student.idParam),
  joiValidator(validator.student.enroll),
  EnrollStudent
);
router.post(
  "/student/:studentId/transfer",
  verifyToken,
  authorizeRoles(Role.SUPER_ADMIN, Role.ADMIN, Role.SCHOOL_ADMIN),
  requirePermission(PERMISSIONS.STUDENT.TRANSFER),
  joiValidator(validator.student.idParam),
  joiValidator(validator.student.transfer),
  TransferStudent
);

export default router;
