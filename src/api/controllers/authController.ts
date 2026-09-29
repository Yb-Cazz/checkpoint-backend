import type { Request, Response } from "express"
import logger from "../../utils/logger.js"
import { LoginData } from "../../types/types.js"
import { loginService } from "../services/authService.js"
import { nodeEnv } from "../../config/env.js"

export const loginController = async (
    req: Request<{}, {}, LoginData>,
    res: Response
) => {

    const {user, token} = await loginService(req.body)
    
    res.cookie("accessToken", token, {
        httpOnly: true,
        secure: nodeEnv === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 1000
    })

    logger.info("Logged in successfully")

    res.status(200).json({
        succcess: true,
        message: "Logged in successfully",
        data: user
    })

}

export const logoutController = (req: Request, res: Response) => {

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: nodeEnv === "production",
        sameSite: "strict"
    })

    return res.status(200).json({
        message: "Logged out successfully"
    })
}