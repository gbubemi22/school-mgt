import User from "../modules/user/model.js";
import Admin, { Role } from "../modules/admin/model.js";
import { Role as RoleModel } from "../modules/role/model.js";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const mapRolePermissions = (roleDoc: any): string[] => {
  if (
    roleDoc &&
    typeof roleDoc === "object" &&
    "permissionIds" in roleDoc &&
    Array.isArray((roleDoc as any).permissionIds)
  ) {
    return (roleDoc as any).permissionIds
      .map((permission: any) => permission?.name)
      .filter(Boolean);
  }

  return [];
};

export const getUserPermissions = async (userId: mongoose.Types.ObjectId | string) => {
  const user = await User.findById(userId)
    .populate({
      path: "roleId",
      populate: { path: "permissionIds", model: "Permission" }
    })
    .populate("permissionIds");

  if (user) {
    const rolePermissions = mapRolePermissions(user.roleId);
    const userPermissions = (user.permissionIds || [])
      .map((permission: any) => permission?.name)
      .filter(Boolean);

    return Array.from(new Set([...rolePermissions, ...userPermissions]));
  }

  const admin = await Admin.findById(userId).populate({
    path: "roleId",
    model: RoleModel,
    populate: { path: "permissionIds", model: "Permission" },
  });

  if (!admin) return [];

  return Array.from(new Set(mapRolePermissions(admin.roleId)));
};


export const authorizeRoles =
  (...allowedRoles: (Role | string)[]) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = req.user;

    if (!user || !user.id) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "User not authenticated",
        httpStatusCode: 401,
        error: "UNAUTHORIZED",
        service: process.env.SERVICE_NAME,
      });
      return;
    }

    let roleName: string | null = null;

    if (user.roleId) {
      const roleDoc = await RoleModel.findById(user.roleId).select("name");
      if (roleDoc?.name) roleName = roleDoc.name;
    }

    if (!roleName && user.role) {
      roleName = user.role;
    }

    if (!roleName) {
      const admin = await Admin.findById(user.id).select("role roleId");
      if (admin?.roleId) {
        const roleDoc = await RoleModel.findById(admin.roleId).select("name");
        if (roleDoc?.name) roleName = roleDoc.name;
      }
      if (!roleName && admin?.role) {
        roleName = admin.role;
      }
    }

    if (!roleName) {
      const dbUser = await User.findById(user.id).select("roleId");
      if (dbUser?.roleId) {
        const roleDoc = await RoleModel.findById(dbUser.roleId).select("name");
        if (roleDoc?.name) roleName = roleDoc.name;
      }
    }

    const normalizedRole = roleName?.trim().toUpperCase();
    const normalizedAllowedRoles = allowedRoles.map((role) =>
      String(role).trim().toUpperCase()
    );

    if (!normalizedRole || !normalizedAllowedRoles.includes(normalizedRole)) {
      res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: "Access denied. Insufficient role permissions.",
        httpStatusCode: 403,
        error: "FORBIDDEN",
        service: process.env.SERVICE_NAME,
      });
      return;
    }

    next();
  };
