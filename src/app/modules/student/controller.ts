import { Controller } from "../../utils/constant.js";
import { createStudent, deleteStudent, enrollStudent, getStudentById, getStudents, transferStudent, updateStudent } from "./service.js";

export const CreateStudent: Controller = async (req, res, next) => {
    try {
        res.status(201).json(await createStudent(req.body));
    } catch (error) {
        next(error);
    }
};

export const GetStudents: Controller = async (req, res, next) => {
    try {
        let { schoolId } = req.params;
        if (Array.isArray(schoolId)) schoolId = schoolId[0];
        res.status(200).json(await getStudents(schoolId));
    } catch (error) {
        next(error);
    }
};

export const GetStudentById: Controller = async (req, res, next) => {
    try {
        let { studentId } = req.params;
        if (Array.isArray(studentId)) studentId = studentId[0];
        res.status(200).json(await getStudentById(studentId));
    } catch (error) {
        next(error);
    }
};

export const UpdateStudent: Controller = async (req, res, next) => {
    try {
        let { studentId } = req.params;
        if (Array.isArray(studentId)) studentId = studentId[0];
        res.status(200).json(await updateStudent(studentId, req.body));
    } catch (error) {
        next(error);
    }
};

export const DeleteStudent: Controller = async (req, res, next) => {
    try {
        let { studentId } = req.params;
        if (Array.isArray(studentId)) studentId = studentId[0];
        res.status(200).json(await deleteStudent(studentId));
    } catch (error) {
        next(error);
    }
};

export const EnrollStudent: Controller = async (req, res, next) => {
    try {
        let { studentId } = req.params;
        const { classroomId } = req.body;
        if (Array.isArray(studentId)) studentId = studentId[0];
        res.status(200).json(await enrollStudent(studentId, classroomId));
    } catch (error) {
        next(error);
    }
};

export const TransferStudent: Controller = async (req, res, next) => {
    try {
        let { studentId } = req.params;
        const { newSchoolId } = req.body;
        if (Array.isArray(studentId)) studentId = studentId[0];
        res.status(200).json(await transferStudent(studentId, newSchoolId));
    } catch (error) {
        next(error);
    }
};
