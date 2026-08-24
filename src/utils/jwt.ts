import jwt from "jsonwebtoken";
import { Role } from "../generated/prisma/enums.js";
import { jwtSecret, jwtExpiresIn } from "../config/env.js";

type JwtData = {
    userId: string
    role: Role
}


export const generateAccessToken = (data: JwtData) => {
    const token = jwt.sign(
        {
            userId: data.userId,
            role: data.role
        },
        jwtSecret,
        {
            expiresIn: jwtExpiresIn,
        }
    )

    return token
}