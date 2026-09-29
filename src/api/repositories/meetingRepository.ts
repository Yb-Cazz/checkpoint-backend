import { prisma } from "../../config/database.js"
import { Prisma } from "../../generated/prisma/client.js"


export const create = async (data: Prisma.MeetingCreateInput) => {
    const meeting = await prisma.meeting.create({
        data
    })
    return meeting
}