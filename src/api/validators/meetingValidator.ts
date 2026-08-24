import Joi from "joi";

export const createMeetingSchema = Joi.object({
    visitor_name: Joi.string()
        .required()
        .messages({
            "any.required": "Please enter your name"
        }),
    visitor_email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Please enter a valid email address",
            "any.required": "Email is required"
        }),
    visitor_phone: Joi.string()
        .min(11)
        .required()
        .messages({
            "string.min": "Please enter a valid phone number",
            "any.required": "Phone number is required"
        }),
    reason: Joi.string()
        .required()
        .messages({
            "any.required": "Please state your reason for visiting"
        }),
    userId: Joi.string()
        .required()
        .messages({
            "any.required": "Please select who you are here to see"
        })
})