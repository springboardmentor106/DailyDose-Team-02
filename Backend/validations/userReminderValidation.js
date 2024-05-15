import Joi from 'joi';

export const createReminderSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    date: Joi.array().items(Joi.date()),
    dayFrequency: Joi.array().items(Joi.string().valid(
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
        'Daily', 'evenWeeks', 'oddWeeks', 'Monthly'
    )),
    completed: Joi.boolean().default(false),
    timeFrequency: Joi.number().integer().min(1).default(1),
    createdBy: Joi.string().valid('user', 'caretaker'),
    pushNotification: Joi.boolean().default(false)
}).options({ abortEarly: false });

// export const getRemindersSchema = Joi.object({

// });

export const updateReminderSchema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string(),
    description: Joi.string(),
    date: Joi.array().items(Joi.date()),
    dayFrequency: Joi.array().items(Joi.string().valid(
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
        'Daily', 'evenWeeks', 'oddWeeks', 'Monthly'
    )),
    completed: Joi.boolean().default(false),
    timeFrequency: Joi.number().integer().min(1).default(1),
    createdBy: Joi.string().valid('user', 'caretaker'),
    pushNotification: Joi.boolean().default(false)
}).options({ abortEarly: false });

// export const deleteReminderSchema = Joi.object({

// });