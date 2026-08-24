import { prisma } from "../config/database.js"
import { UnauthorizedError } from "../errors/AppError.js"
import { Prisma } from "../generated/prisma/client.js"
import { UserUpdateInput } from "../generated/prisma/models.js"

export const onboardStaff = async ({id, firstName, lastName, password}:UserUpdateInput) => {

    if(!(id && firstName && lastName && password)){
        throw new UnauthorizedError("Invalid Email or password")
    }
    const user = await prisma.user.update({
        where: {id: id as string},
        data: {
            firstName: firstName,
            lastName: lastName,
            password: password
        }
    })
    return user
}