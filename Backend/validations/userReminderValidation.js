import { Joi } from "express-validation";


export const createReminderSchema = Joi.object({
    title: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
    dayFrequency: Joi.array().items(Joi.string().valid(
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
        'Daily', 'evenWeeks', 'oddWeeks', 'Monthly', 'Today'
    )),
    completed: Joi.boolean().default(false),
    completedToday: Joi.boolean().default(false),
    timeFrequency: Joi.number().integer().min(1).default(1),
    pushNotification: Joi.boolean().default(false),
    createdBy: Joi.string(),
    createdById: Joi.string()
}).options({ abortEarly: false });

export const updateReminderSchema = Joi.object({
    reminderId:Joi.string().required(),
    title: Joi.string(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    startTime: Joi.string(),
    endTime: Joi.string(),
    dayFrequency: Joi.array().items(Joi.string().valid(
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
        'Daily', 'evenWeeks', 'oddWeeks', 'Monthly', 'Today'
    )),
    completed: Joi.boolean().default(false),
    completedToday: Joi.boolean().default(false),
    timeFrequency: Joi.number().integer().min(1).default(1),
    pushNotification: Joi.boolean().default(false)
}).options({ abortEarly: false });