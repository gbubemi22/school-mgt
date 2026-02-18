import { Controller } from "../../utils/constant.js";
import { createClassroom, deleteClassroom, getClassroomById, getClassrooms, updateClassroom } from "./service.js";

export const CreateClassroom: Controller = async (req, res, next) => {
    try {
        res.status(201).json(await createClassroom(req.body));
    } catch (error) {
        next(error);
    }
};

export const GetClassrooms: Controller = async (req, res, next) => {
    try {
        let { schoolId } = req.params;
        if (Array.isArray(schoolId)) schoolId = schoolId[0];
        res.status(200).json(await getClassrooms(schoolId));
    } catch (error) {
        next(error);
    }
};

export const GetClassroomById: Controller = async (req, res, next) => {
    try {
        let { classroomId } = req.params;
        if (Array.isArray(classroomId)) classroomId = classroomId[0];
        res.status(200).json(await getClassroomById(classroomId));
    } catch (error) {
        next(error);
    }
};

export const UpdateClassroom: Controller = async (req, res, next) => {
    try {
        let { classroomId } = req.params;
        if (Array.isArray(classroomId)) classroomId = classroomId[0];
        res.status(200).json(await updateClassroom(classroomId, req.body));
    } catch (error) {
        next(error);
    }
};

export const DeleteClassroom: Controller = async (req, res, next) => {
    try {
        let { classroomId } = req.params;
        if (Array.isArray(classroomId)) classroomId = classroomId[0];
        res.status(200).json(await deleteClassroom(classroomId));
    } catch (error) {
        next(error);
    }
};
