import express from "express";
import { CreateStudent, DeleteStudent, EnrollStudent, GetStudentById, GetStudents, TransferStudent, UpdateStudent } from "./controller.js";
import { verifyToken } from "../../middleware/auth.js";
import { authorizeRoles } from "../../middleware/checkRole.js";
import validator, { joiValidator } from "../../utils/validator.js";


const router = express.Router();

/**
 * @openapi
 * /v1/student:
 *   post:
 *     tags:
 *       - Student
 *     summary: Create student
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
    authorizeRoles("SUPER_ADMIN", "ADMIN", "SCHOOL_ADMIN"),
    joiValidator(validator.student.create),
    CreateStudent
);
/**
 * @openapi
 * /v1/student/{schoolId}:
 *   get:
 *     tags:
 *       - Student
 *     summary: Get students by school
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: schoolId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 */
router.get(
    "/:schoolId",
    verifyToken,
    authorizeRoles("SUPER_ADMIN", "ADMIN", "SCHOOL_ADMIN", "SUPPORT"),
    joiValidator(validator.student.schoolParam),
    GetStudents
);
/**
 * @openapi
 * /v1/student/student/{studentId}:
 *   get:
 *     tags:
 *       - Student
 *     summary: Get student by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
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
    "/student/:studentId",
    verifyToken,
    authorizeRoles("SUPER_ADMIN", "ADMIN", "SCHOOL_ADMIN", "SUPPORT"),
    joiValidator(validator.student.idParam),
    GetStudentById
);
/**
 * @openapi
 * /v1/student/student/{studentId}:
 *   put:
 *     tags:
 *       - Student
 *     summary: Update student
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
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
    "/student/:studentId",
    verifyToken,
    authorizeRoles("SUPER_ADMIN", "ADMIN", "SCHOOL_ADMIN"),
    joiValidator(validator.student.idParam),
    joiValidator(validator.student.update),
    UpdateStudent
);
/**
 * @openapi
 * /v1/student/student/{studentId}:
 *   delete:
 *     tags:
 *       - Student
 *     summary: Delete student
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
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
    "/student/:studentId",
    verifyToken,
    authorizeRoles("SUPER_ADMIN", "ADMIN"),
    joiValidator(validator.student.idParam),
    DeleteStudent
);
/**
 * @openapi
 * /v1/student/student/{studentId}/enroll:
 *   post:
 *     tags:
 *       - Student
 *     summary: Enroll student
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
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
router.post(
    "/student/:studentId/enroll",
    verifyToken,
    authorizeRoles("SUPER_ADMIN", "ADMIN", "SCHOOL_ADMIN"),
    joiValidator(validator.student.idParam),
    joiValidator(validator.student.enroll),
    EnrollStudent
);
/**
 * @openapi
 * /v1/student/student/{studentId}/transfer:
 *   post:
 *     tags:
 *       - Student
 *     summary: Transfer student
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
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
router.post(
    "/student/:studentId/transfer",
    verifyToken,
    authorizeRoles("SUPER_ADMIN", "ADMIN", "SCHOOL_ADMIN"),
    joiValidator(validator.student.idParam),
    joiValidator(validator.student.transfer),
    TransferStudent
);

export default router;
