import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError.js";
import logger from "../../utils/logger.js";
import { Prisma } from "../../generated/prisma/client.js";

export const errorMiddleware = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    
    if(err instanceof AppError) { 
        logger.error({
            err,
            statusCode: err.statusCode
        })
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors
        })
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
    logger.error(err);

    return res.status(500).json({
        success: false,
        message: "Database error"
    });
}

    logger.error(err)

    return res.status(500).json({
        success: false,
        message: "Internal server error"
    })
}