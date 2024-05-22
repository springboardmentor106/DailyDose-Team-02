import { Joi } from "express-validation";

export const createReminderSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    completed: Joi.boolean().default(false),
    dayFrequency: Joi.array().items(Joi.string().valid(
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
        'Daily', 'evenWeeks', 'oddWeeks', 'Monthly', 'Today'
    )).required(),
    frequencyPerDay: Joi.number().integer().min(1).default(1),
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
    pushNotification: Joi.boolean().default(false)
}).options({ abortEarly: false });


export const updateReminderSchema = Joi.object({
    reminderId: Joi.string().required(),
    title: Joi.string(),
    description: Joi.string(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    completed: Joi.boolean(),
    dayFrequency: Joi.array().items(Joi.string().valid(
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
        'Daily', 'evenWeeks', 'oddWeeks', 'Monthly', 'Today'
    )),
    frequencyPerDay: Joi.number().integer().min(1),
    startTime: Joi.date(),
    endTime: Joi.date(),
    pushNotification: Joi.boolean()
}).options({ abortEarly: false });