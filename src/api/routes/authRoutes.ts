import { Router } from "express";
import { loginController, logoutController } from "../controllers/authController.js";
import { validateBody } from "../middlewares/validateMiddleware.js";
import { loginSchema } from "../validators/authValidator.js";


const router = Router()


router.post(
    "/login", 
    validateBody(loginSchema),
    loginController
)

router.post(
    "/logout", 
    logoutController
)

export default router