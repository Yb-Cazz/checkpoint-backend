import { Router } from "express";
import { validateBody } from "../middlewares/validateMiddleware.js";
import { onboardStaffSchema } from "../validators/staffValidator.js";
import { onboardStaffController } from "../controllers/staffController.js";



const router = Router()


router.post(
    "/onboard",
    validateBody(onboardStaffSchema),
    onboardStaffController
)

export default router