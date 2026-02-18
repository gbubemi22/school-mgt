import express from "express";
import { CreateClassroom, DeleteClassroom, GetClassroomById, GetClassrooms, UpdateClassroom } from "./controller.js";
import { verifyToken } from "../../middleware/auth.js";
import { authorizeRoles } from "../../middleware/checkRole.js";
import { requirePermission } from "../../middleware/requirePermission.js";
import validator, { joiValidator } from "../../utils/validator.js";

const router = express.Router();

/**
 * @openapi
 * /v1/classroom:
 *   post:
 *     tags:
 *       - Classroom
 *     summary: Create classroom
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

    joiValidator(validator.classroom.create),
    CreateClassroom
);
/**
 * @openapi
 * /v1/classroom/{schoolId}:
 *   get:
 *     tags:
 *       - Classroom
 *     summary: Get classrooms by school
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

    joiValidator(validator.classroom.schoolParam),
    GetClassrooms
);
/**
 * @openapi
 * /v1/classroom/classroom/{classroomId}:
 *   get:
 *     tags:
 *       - Classroom
 *     summary: Get classroom by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classroomId
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
    "/classroom/:classroomId",
    verifyToken,
    authorizeRoles("SUPER_ADMIN", "ADMIN", "SCHOOL_ADMIN", "SUPPORT"),

    joiValidator(validator.classroom.idParam),
    GetClassroomById
);
/**
 * @openapi
 * /v1/classroom/classroom/{classroomId}:
 *   put:
 *     tags:
 *       - Classroom
 *     summary: Update classroom
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classroomId
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
    "/classroom/:classroomId",
    verifyToken,
    authorizeRoles("SUPER_ADMIN", "ADMIN", "SCHOOL_ADMIN"),

    joiValidator(validator.classroom.idParam),
    joiValidator(validator.classroom.update),
    UpdateClassroom
);
/**
 * @openapi
 * /v1/classroom/classroom/{classroomId}:
 *   delete:
 *     tags:
 *       - Classroom
 *     summary: Delete classroom
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classroomId
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
    "/classroom/:classroomId",
    verifyToken,
    authorizeRoles("SUPER_ADMIN", "ADMIN"),
    joiValidator(validator.classroom.idParam),
    DeleteClassroom
);

export default router;
