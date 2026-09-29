import { AccountStatus, Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../../config/database.js"


export const findUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email : email
        }
    })
    return user
}

export const findUserById = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    return user
}