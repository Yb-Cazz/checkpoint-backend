import { Prisma } from "../generated/prisma/client.js";
import {prisma} from "../config/database.js"



export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    return user
}