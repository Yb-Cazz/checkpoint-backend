import type { Request, Response } from "express"
import { OnboardStaffData } from "../../types/types.js"
import logger from "../../utils/logger.js"
import { onboardStaffService } from "../services/staffService.js"

type OnboardStaffParam = {
    id: string
}


export const onboardStaffController = async (
    req: Request<OnboardStaffParam, {}, OnboardStaffData>,
    res:Response
) => {
    const {id} = req.params
    const {firstName, lastName, newPassword} = req.body

    const user = await onboardStaffService({id, firstName, lastName, newPassword})

    logger.info("Staff onboarded successfully")

    res.status(200).json({
        success: true,
        message: "Staff onboarded successfully",
        data: user
    })
}