import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { getUserPermissions } from "./checkRole.js";


export const requirePermission = (permission: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    success: false,
                    message: "Unauthorized: No user ID found",
                });
            }
            const permissions = await getUserPermissions(userId);
            if (!permissions.includes(permission)) {
                return res.status(StatusCodes.FORBIDDEN).json({
                    success: false,
                    message: `Forbidden: Missing permission '${permission}'`,
                });
            }
            next();
        } catch (err) {
            next(err);
        }
    };
};
