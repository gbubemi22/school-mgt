import { Controller } from "../../utils/constant.js";
import { createSchool, deleteSchool, getSchoolById, getSchools, updateSchool } from "./service.js";

export const CreateSchool: Controller = async (req, res, next) => {
    try {
        const userId = req.user.id;
        res.status(201).json(await createSchool({ ...req.body, userId }));
    } catch (error) {
        next(error);
    }
};

export const GetSchools: Controller = async (req, res, next) => {
    try {
        res.status(200).json(await getSchools());
    } catch (error) {
        next(error);
    }
};

export const GetSchoolById: Controller = async (req, res, next) => {
    try {
        const { schoolId } = req.params;
        res.status(200).json(await getSchoolById(schoolId.toString()));
    } catch (error) {
        next(error);
    }
};

export const UpdateSchool: Controller = async (req, res, next) => {
    try {
        const { schoolId } = req.params;
        res.status(200).json(await updateSchool(schoolId.toString(), req.body));
    } catch (error) {
        next(error);
    }
};

export const DeleteSchool: Controller = async (req, res, next) => {
    try {
        const { schoolId } = req.params;
        res.status(200).json(await deleteSchool(schoolId.toString()));
    } catch (error) {
        next(error);
    }
};
