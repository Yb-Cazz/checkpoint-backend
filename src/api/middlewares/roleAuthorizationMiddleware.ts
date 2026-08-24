import type { Request, Response, NextFunction } from "express";
import { Roles } from "../../types/types.js";
import { ForbiddenError, UnauthorizedError } from "../../errors/AppError.js";


export const authorize = (...allowedRoles: Roles[]) => {
    return (
        req:Request,
        res:Response,
        next: NextFunction
    ) => {
        if (!req.user) {
            throw new UnauthorizedError("Authentication Required")
        }
        
        if(!allowedRoles.includes(req.user.role)) {
            throw new ForbiddenError("You do not have permission to access this resource")
        }

        next()
    }
}