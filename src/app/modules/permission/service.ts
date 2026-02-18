import { ConflictError, NotFoundError } from '../../utils/error.js';
import { Permission } from './model.js';

export const createPermission = async (name: string) => {
    const checkPermission = await Permission.findOne({ name });
    if (checkPermission) {
       throw new ConflictError(`Permission with name "${name}" already exists`);
    }
    const permission = await Permission.create({ name });
    return {
        success: true,
        message: "Permission created successfully",
        data: {
            id: permission._id,
            name: permission.name,
        },
    };
};

export const getPermissions = async () => {
    const permissions = await Permission.find();
    return {
        success: true,
        message: "Permissions retrieved successfully",
        data: permissions.map((permission) => ({
            id: permission._id,
            name: permission.name,
        })),
    };
};

export const getPermissionById = async (permissionId: string) => {
    const permission = await Permission.findById(permissionId);
    if (!permission) {
       throw new NotFoundError(`Permission with id "${permissionId}" not found`);
    }
    return {
        success: true,
        message: "Permission retrieved successfully",
        data: {
            id: permission._id,
            name: permission.name,
        },
    };
};

export const updatePermission = async (permissionId: string, name: string) => {
    const permission = await Permission.findByIdAndUpdate(permissionId, { name }, { new: true });
    if (!permission) {
        throw new NotFoundError(`Permission with id "${permissionId}" not found`);
    }
    return {
        success: true,
        message: "Permission updated successfully",
        data: {
            id: permission._id,
            name: permission.name,
        },
    };
};

export const deletePermission = async (permissionId: string) => {
    const permission = await Permission.findByIdAndDelete(permissionId);
    if (!permission) {
       throw new NotFoundError(`Permission with id "${permissionId}" not found`);
    }
    return {
        success: true,
        message: "Permission deleted successfully",
    };
};
