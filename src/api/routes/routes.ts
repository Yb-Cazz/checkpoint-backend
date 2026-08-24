import { Router, Response, Request } from "express";

import meetingRoutes from "./meetingRoutes.js"
import adminRoutes from "./adminRoutes.js"
import authRoutes from "./authRoutes.js"
import staffRoutes from "./staffRoutes.js"

const router = Router()

// router.use("/", (req:Request, res:Response) => res.status(200).json({status: "ok"}))

router.use("/auth", authRoutes)
router.use("/admin", adminRoutes)
router.use("/meeting", meetingRoutes)
router.use("/staff", staffRoutes)


export default router