import { Joi } from "express-validation";

export const createNotificationSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
})

