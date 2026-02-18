import { Controller } from "../../utils/constant.js";
import { createRole, deleteRole, getRoleById, getRoles, updateRole } from "./service.js";





export const CreateRole: Controller = async (req, res, next) => {
    try {
        const { name, permissionIds } = req.body;
        res.status(201).json(await createRole(name, permissionIds));
    } catch (error) {
        next(error);
    }
}

export const GetRoles: Controller = async (req, res, next) => {
    try {
        res.status(200).json(await getRoles());
    } catch (error) {
        next(error);
    }
}

export const GetRoleById: Controller = async (req, res, next) => {
    try {
        const {roleId} = req.params;
        // const roleId = Array.isArray(id) ? id[0] : id;
        res.status(200).json(await getRoleById(roleId.toString()));
    } catch (error) {
        next(error);
    }
}

export const UpdateRole: Controller = async (req, res, next) => {
    try {
        const { roleId } = req.params;
        const { name, permissionIds } = req.body;
        res.status(200).json(await updateRole(roleId.toString(), name, permissionIds));
    } catch (error) {
        next(error);
    }
}

export const DeleteRole: Controller = async (req, res, next) => {
    try {
        const { roleId } = req.params;
        res.status(200).json(await deleteRole(roleId.toString()));
    } catch (error) {
        next(error);
    }
}   