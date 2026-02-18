import express from "express";
import { CreateSchool, DeleteSchool, GetSchoolById, GetSchools, UpdateSchool } from "./controller.js";
import { verifyToken } from "../../middleware/auth.js";
import { authorizeRoles } from "../../middleware/checkRole.js";
import validator, { joiValidator } from "../../utils/validator.js";



const router = express.Router();

/**
 * @openapi
 * /v1/school:
 *   post:
 *     tags:
 *       - School
 *     summary: Create school
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
  joiValidator(validator.school.create),
  CreateSchool
);
/**
 * @openapi
 * /v1/school:
 *   get:
 *     tags:
 *       - School
 *     summary: Get schools
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
  authorizeRoles("SUPER_ADMIN", "ADMIN", "SCHOOL_ADMIN", "SUPPORT"),
  GetSchools
);
/**
 * @openapi
 * /v1/school/{schoolId}:
 *   get:
 *     tags:
 *       - School
 *     summary: Get school by id
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
 *       404:
 *         description: Not found
 */
router.get(
  "/:schoolId",
  verifyToken,
  authorizeRoles("SUPER_ADMIN", "ADMIN", "SCHOOL_ADMIN", "SUPPORT"),
  joiValidator(validator.school.idParam),
  GetSchoolById
);
/**
 * @openapi
 * /v1/school/{schoolId}:
 *   put:
 *     tags:
 *       - School
 *     summary: Update school
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: schoolId
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
  "/:schoolId",
  verifyToken,
  authorizeRoles("SUPER_ADMIN", "ADMIN", "SCHOOL_ADMIN"),
  joiValidator(validator.school.idParam),
  joiValidator(validator.school.update),
  UpdateSchool
);
/**
 * @openapi
 * /v1/school/{schoolId}:
 *   delete:
 *     tags:
 *       - School
 *     summary: Delete school
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
 *       403:
 *         description: Forbidden
 */
router.delete(
  "/:schoolId",
  verifyToken,
  authorizeRoles("SUPER_ADMIN", "ADMIN"),
  joiValidator(validator.school.idParam),
  DeleteSchool
);

export default router;
