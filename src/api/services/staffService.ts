import { ConflictError, NotFoundError } from "../../errors/AppError.js";
import { findUserById } from "../repositories/globalRepository.js";
import { onboardStaff } from "../repositories/staffRepository.js";
import { OnboardStaffData } from "../../types/types.js";
import { comparePassword } from "../../utils/handlePassword.js";

interface OnboardStaffService extends OnboardStaffData {
    id: string
}

export const onboardStaffService = async ({id, firstName, lastName, newPassword}:OnboardStaffService) => {
    // Check if the user exists using the id passed in the param
    const existingStaff = await findUserById(id)
    if(!existingStaff) {
        throw new NotFoundError("Staff with this account doesn't exist")
    }

    // TODO: Check if the user account status is inactive before accepting the request (Implement as middleware)

    // check if new password = old password saved dn db
    const isPasswordSame = await comparePassword(newPassword, existingStaff.password)
    if(isPasswordSame) {
        throw new ConflictError("New password cannot be same as old password")
    }

    // Send the request to the repository
    const user = await onboardStaff({
        id,
        firstName, 
        lastName,
        password: newPassword
    })
    return user
}