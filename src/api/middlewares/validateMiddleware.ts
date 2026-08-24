import type { Request, Response, NextFunction } from "express"
import Joi from "joi"

export const validateBody = ( schema: Joi.ObjectSchema ) => {
    return (req:Request, res:Response, next:NextFunction) => {
        const {error, value} = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        })

        if(error) {
            return res.status(400).json({
                message: "Validation failed. Please confirm your details",
                errors: error.details.map((detail) => ({
                    field: detail.path.join("."),
                    message: detail.message
                }))
            })
        }

        req.body = value;

        return next()
    }
}