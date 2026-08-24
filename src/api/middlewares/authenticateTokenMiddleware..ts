import type { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

import { UnauthorizedError } from "../../errors/AppError.js"
import { jwtSecret } from "../../config/env.js"
import { Roles } from "../../types/types.js";

type AuthPayload = {
  userId: string;
  role: Roles;
};

export const authenticateToken = (
    req: Request,
    res:Response,
    next:NextFunction
)=> {
    let token = req.cookies.accessToken;

    // If no cookie, check Authorization header
    if(!token) {
        const authHeader = req.headers["authorization"]
        if(authHeader?.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1]
        }
    }

    // 3. No token found anywhere
    if (!token) {
        throw new UnauthorizedError("Authentication Required");
    }

    // Verify token
    try {
    const decoded = jwt.verify(
      token,
      jwtSecret
    ) as AuthPayload;

    // Attach info to request
    req.user = decoded;

    next();
  } catch {
    throw new UnauthorizedError("Unauthorized to access this route")
  }

}