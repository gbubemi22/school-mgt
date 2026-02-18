import { Controller } from "../../utils/constant.js";
import { createPermission, deletePermission, getPermissionById, getPermissions, updatePermission } from "./service.js";

export const CreatePermission: Controller = async (req, res, next) => {
    try {
        res.status(201).json(await createPermission(req.body.name));
    } catch (error) {
        next(error);
    }
};

export const GetPermissions: Controller = async (req, res, next) => {
    try {
        res.status(200).json(await getPermissions());
    } catch (error) {
        next(error);
    }
};

export const GetPermissionById: Controller = async (req, res, next) => {
    try {
        const { permissionId } = req.params;
        res.status(200).json(await getPermissionById(permissionId.toString()));
    } catch (error) {
        next(error);
    }
};

export const UpdatePermission: Controller = async (req, res, next) => {
    try {
        const { permissionId } = req.params;
        res.status(200).json(await updatePermission(permissionId.toString(), req.body.name));
    } catch (error) {
        next(error);
    }
};

export const DeletePermission: Controller = async (req, res, next) => {
    try {
        const { permissionId } = req.params;
        res.status(200).json(await deletePermission(permissionId.toString()));
    } catch (error) {
        next(error);
    }
};
