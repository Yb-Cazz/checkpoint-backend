import { AccountStatus, Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../../config/database.js"
import { ConflictError, NotFoundError } from "../../errors/AppError.js";
import { FindUniqueUser, ResetPasswordData } from "../../types/types.js";


// create staff repo
export const createStaff = async (data: Prisma.UserCreateInput) => {    
    const staff = await prisma.user.create({
        data
    })
    return staff
}

export const isDisabled = async (userId: string) => {
    // Check if account is already disabled
    const isUserDisabled = await prisma.user.findUnique({
        where: {
            id: userId,
            account_status: AccountStatus.disabled
        }
    })

    return isUserDisabled
}

// Disable staff repo (set AccountStatus -> disable)
export const disableStaff = async (userId: string) => {
    const disabledStaff = await prisma.user.update({
        where: {id: userId},
        data: {
            account_status: AccountStatus.disabled
        }
    })
    return disabledStaff
}

export const isActive = async (userId: string) => {
    // Check if account is already enabled
    const isUserActive = await prisma.user.findUnique({
        where: {
            id: userId,
            account_status: AccountStatus.active
        }
    })

    return isUserActive
}

// enable staff repo (set AccountStatus -> active)
export const enableStaff = async (userId: string) => {
    const enableStaff = await prisma.user.update({
        where: {id: userId},
        data: {
            account_status: AccountStatus.active
        }
    })
    return enableStaff
}

// Reset password repo
export const resetPassword = async ({email, newPassword}:ResetPasswordData) => {
    const user = await prisma.user.update({
        where: {email: email},
        data: {
            password: newPassword
        }
    })
    return user
}