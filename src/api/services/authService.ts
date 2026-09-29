import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { UnauthorizedError } from "../../errors/AppError.js";
import { LoginData } from "../../types/types.js";
import { comparePassword } from "../../utils/handlePassword.js";
import { getUserByEmail } from "../repositories/authRepository.js";
import { jwtExpiresIn, jwtSecret } from "../../config/env.js";
import { generateAccessToken } from "../../utils/jwt.js";



export const loginService = async(data:LoginData) => {

    // Get the User from repository
    const user = await getUserByEmail(data.email)
    if(!user) {
        throw new UnauthorizedError("Invalid Email or password")
    }

    // Check if password is correct
    const isPasswordValid = await comparePassword(data.password, user.password)
    if(!isPasswordValid) {
        throw new UnauthorizedError("Invalid Email or password")
    }

    // Check if account is disabled
    if(user.account_status === "disabled") {
        throw new UnauthorizedError("Your Account has been disabled")
    }

    // Create jwt token to sign in the user
    const token = generateAccessToken({
        userId: user.id,
        role: user.role
    })

    return {
        user: user,
        token: token
    }



}