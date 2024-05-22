import { Joi } from "express-validation";

export const createReminderSchema = Joi.object({
    title: Joi.string().required(),
    endDate: Joi.date().required(),
    description: Joi.string(),
    date: Joi.array().items(Joi.date()),
    dayFrequency: Joi.array().items(Joi.string().valid(
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
        'Daily', 'evenWeeks', 'oddWeeks', 'Monthly', 'Today'
    )).required(),
    completed: Joi.boolean().default(false),
    timeFrequency: Joi.number().integer().min(1).default(1),
    // createdBy: Joi.string().valid('user', 'caretaker'),
    pushNotification: Joi.boolean().default(false)
}).options({ abortEarly: false });


export const updateReminderSchema = Joi.object({
    reminderId: Joi.string().required(),
    title: Joi.string(),
    endDate: Joi.date(),
    description: Joi.string(),
    date: Joi.array().items(Joi.date()),
    dayFrequency: Joi.array().items(Joi.string().valid(
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
        'Daily', 'evenWeeks', 'oddWeeks', 'Monthly', 'Today'
    )),
    completed: Joi.boolean().default(false),
    timeFrequency: Joi.number().integer().min(1).default(1),
    createdBy: Joi.string().valid('user', 'caretaker'),
    pushNotification: Joi.boolean().default(false)
}).options({ abortEarly: false });