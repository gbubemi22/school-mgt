import { ConflictError, NotFoundError } from '../../utils/error.js';
import { Role } from './model.js';

export const createRole = async (name: string, permissionIds: string[] = []) => {
    const checkRole = await Role.findOne({ name });
    if (checkRole) {
        throw new ConflictError(`Role with name "${name}" already exists`);
    }
    const role = await Role.create({ name, permissionIds });
    return {
        success: true,
        message: "Role created successfully",
        data: {
            id: role._id,
            name: role.name,
            permissionIds: role.permissionIds,
        },
    };
}

export const getRoles = async () => {
    const roles = await Role.find();

    return {
        success: true,
        message: "Roles retrieved successfully",
        data: roles.map((role) => ({
            id: role._id,
            name: role.name,
        })),
    };
}

export const getRoleById = async (roleId: string) => {
    const role = await Role.findById(roleId);

    if (!role) {
       throw new NotFoundError(`Role with id "${roleId}" not found`);
    }

    return {
        success: true,
        message: "Role retrieved successfully",
        data: {
            id: role._id,
            name: role.name,
        },
    };
}

export const updateRole = async (roleId: string, name: string, permissionIds: string[] = []) => {
    const update: any = { name };
    if (permissionIds && permissionIds.length > 0) {
        update.permissionIds = permissionIds;
    }
    const role = await Role.findByIdAndUpdate(roleId, update, { new: true });
    if (!role) {
        throw new NotFoundError(`Role with id "${roleId}" not found`);
    }
    return {
        success: true,
        message: "Role updated successfully",
        data: {
            id: role._id,
            name: role.name,
            permissionIds: role.permissionIds,
        },
    };
}

export const deleteRole = async (roleId: string) => {
    const role = await Role.findByIdAndDelete(roleId);

    if (!role) {
        throw new NotFoundError(`Role with id "${roleId}" not found`);
    }

    return {
        success: true,
        message: "Role deleted successfully",
    };
}