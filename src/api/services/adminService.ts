

import { ConflictError, NotFoundError } from "../../errors/AppError.js"
import { 
    createStaff, 
    disableStaff, 
    enableStaff, isActive, 
    isDisabled, 
    resetPassword 
} from "../repositories/adminRespository.js"
import { findUserByEmail, findUserById } from "../repositories/globalRepository.js"
import { CreateStaffData, ResetPasswordData } from "../../types/types.js"
import { comparePassword, hashPassword } from "../../utils/handlePassword.js"
import { generateRandomPassword } from "../../utils/randomPassword.js"


export const createStaffService = async ( data: CreateStaffData) => {
    // Check if staff exists already
    const existingStaff = await findUserByEmail(data.email)
    if(existingStaff) {
        throw new ConflictError("Staff with this email already Exists")
    }

    // generate random password
    const randomPassword = generateRandomPassword()
    const hashedPassword = await hashPassword(randomPassword)

    const staff = await createStaff({
        email: data.email,
        password: hashedPassword
    })
    return staff
}

export const disableStaffService = async (id: string) => {
    // Check if staff exists
    const existingStaff = await findUserById(id)
     if(!existingStaff) {
        throw new NotFoundError("Staff with this account doesn't exist")
    }

    // Check if user is already disabled
    const isUserDisabled = await isDisabled(id)
    if(isUserDisabled) {
        throw new ConflictError("Staff account is already disabled")
    }

    const disabledStaff = await disableStaff(id)
    return disabledStaff
}

export const enableStaffService = async (id: string) => {
    // Check if staff exists
    const existingStaff = await findUserById(id)
     if(!existingStaff) {
        throw new NotFoundError("Staff with this account doesn't exist")
    }

    // Check if user is already active
    const isUserActive = await isActive(id)
    if(isUserActive) {
        throw new ConflictError("Staff account is already active")
    }

    const enabledStaff = await enableStaff(id)
    return enabledStaff
}

export const resetPasswordService = async ({email, newPassword}:ResetPasswordData) => {
    // check if user exists
    const user = await findUserByEmail(email)
    if(!user) {
        throw new NotFoundError("Staff with this account doesn't exist")
    }

    // compare if new password == old password
    const isPasswordSame = await comparePassword(newPassword, user.password)
    if(isPasswordSame) {
        throw new ConflictError("New password cannot be same as old password")
    }

    // hash the password
    const hashedPassword = await hashPassword(newPassword)

    const staff = await resetPassword(
        {
            email, 
            newPassword: hashedPassword
        }
    )
    return staff
}