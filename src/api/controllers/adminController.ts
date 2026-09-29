import type { Request, Response } from "express"
import logger from "../../utils/logger.js"

import { CreateStaffData, ResetPasswordData } from "../../types/types.js"
import { 
    createStaffService, 
    disableStaffService, 
    enableStaffService, 
    resetPasswordService 
} from "../services/adminService.js"

type StaffStatusParam = {
    id: string
}


export const createStaffController = async (
    req:Request<{}, {}, CreateStaffData>, 
    res:Response
)=> {
    const staff = await createStaffService(req.body)

    logger.info("Staff created successfully")

    res.status(201).json({
        status: true,
        message: "Staff created successfully",
        data: staff
    })
}

export const disableStaffController = async(
    req: Request<StaffStatusParam, {}, {}>,
    res: Response
) => {
    
    const {id} = req.params

    const disabledStaff = await disableStaffService(id)

    logger.info("Staff accouont disabled Successfully")

    res.status(200).json({
        status: true,
        message: "Staff accouont disabled Successfully",
        data: disabledStaff
    })
}

export const enableStaffController = async(
    req: Request<StaffStatusParam, {}, {}>,
    res: Response
) => {
    
    const {id} = req.params

    const enabledStaff = await enableStaffService(id)

    logger.info("Staff account enabled successfully")

    res.status(200).json({
        status: true,
        message: "Staff accouont enabled successfully",
        data: enabledStaff
    })
}

export const resetPasswordController = async (
    req: Request<{}, {}, ResetPasswordData>,
    res: Response
) => {

    const {email, newPassword} = req.body

    const user = await resetPasswordService({email, newPassword})

    logger.info("Password reset successful")

    res.status(200).json({
        status: true,
        message: "Password reset successful",
        data: user
    })
}