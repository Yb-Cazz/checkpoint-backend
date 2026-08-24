import { Router } from "express";
import { createStaffController, disableStaffController, enableStaffController, resetPasswordController } from "../controllers/adminController.js";
import { validateBody } from "../middlewares/validateMiddleware.js";
import { createStaffSchema, resetPasswordSchema } from "../validators/adminValidators.js";
import { authorize } from "../middlewares/roleAuthorizationMiddleware.js";
import { authenticateToken } from "../middlewares/authenticateTokenMiddleware..js";

const router = Router()

// Authenticate and authorize the request
router.use(
    authenticateToken,
    authorize("ADMIN")
)

router.get(
    "/", 
    async(req, res) => res.status(200).json({message: "Route accessed successfully"})
)

// Create staff
router.post(
    "/staff", 
    validateBody(createStaffSchema), 
    createStaffController
)

// Disable Staff account
router.patch(
    "/staff/:id/disable", 
    disableStaffController
)

// Re-enable staff account
router.patch(
    "/staff/:id/enable", 
    enableStaffController
)

//Reset staff password
router.post(
    "/staff/reset-password",
    validateBody(resetPasswordSchema),
    resetPasswordController
) 

export default router