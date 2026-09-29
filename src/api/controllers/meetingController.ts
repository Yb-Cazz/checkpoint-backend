import type { Request, Response } from "express"
import { createMeetingService } from "../services/meetingService.js"
import { MeetingStatus, Prisma } from "../../generated/prisma/client.js";
import logger from "../../utils/logger.js";

import { CreateMeetingData } from "../../types/types.js";

// type CreateMeetingRequest = {
//   visitor_name: string;
//   visitor_email: string;
//   visitor_phone: string;
//   reason: string;
//   userId: string;
// };

export const createMeeting = async (
    req:Request<{}, {}, CreateMeetingData>, 
    res:Response, 
) => {

    const meeting = await createMeetingService(req.body)

    logger.info("Meeting created successfully")

    return res.status(201).json({
        success: true,
        message: "Meeting created successfully",
        data: meeting
    })
    // Return the Success or error message
}