import Joi from "joi";

export const createStaffSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Please enter a valid email address",
            "any.required": "Email is required"
        })
})

export const resetPasswordSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Please enter a valid email address",
            "any.required": "Email is required"
        }),

    newPassword: Joi.string()
        .min(8)
        .required()
        .messages({
            "string.min": "Password must be at least 8 characters",
            "any.required": "Password is required"
        })
})