import { Router } from "express";
import { createMeeting } from "../controllers/meetingController.js";
import { validateBody } from "../middlewares/validateMiddleware.js";
import { createMeetingSchema } from "../validators/meetingValidator.js";


const router = Router()


// router.get("/", async (req, res) => {res.status(200).json({message: "In the meeting route"})})

router.post("/",validateBody(createMeetingSchema), createMeeting)

export default router