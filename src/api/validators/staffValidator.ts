import Joi from "joi";

export const onboardStaffSchema = Joi.object({
    firstName: Joi.string()
        .required()
        .messages({
            "any.required": "Please enter your firstname"
        }),

    lastName: Joi.string()
        .required()
        .messages({
            "any.required": "Please enter your Lastname"
        }),

    newPassword: Joi.string()
        .min(8)
        .required()
        .messages({
            "string.min": "Password must be at least 8 characters",
            "any.required": "Password is required"
        })
})