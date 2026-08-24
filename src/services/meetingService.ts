// routes -> validator -> controller -> service -> repository -> db

import { create } from "../repositories/meetingRepository.js"
import { MeetingStatus} from "../generated/prisma/client.js"
import { ConflictError } from "../errors/AppError.js";
import { CreateMeetingData } from "../types/types.js";

export const createMeetingService = async (data: CreateMeetingData) => {
    const meeting = await create({
        visitor_name: data.visitor_name,
        visitor_email: data.visitor_email,
        visitor_phone: data.visitor_phone,
        reason: data.reason,
        status: MeetingStatus.Pending,

        user: {
            connect: {
                id: data.userId
            }
        }
    })


    return meeting 
}