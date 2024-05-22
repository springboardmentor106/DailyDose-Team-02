import { Joi } from "express-validation";

export const createGoalSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    completed: Joi.boolean().default(false),
    completedToday: Joi.boolean().default(false),
    goalStatus: Joi.array().items(Joi.string().valid(
        'not_started', 'in_progress', 'completed')),
    dayFrequency: Joi.array().items(Joi.string().valid(
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Daily', 'evenWeeks', 'oddWeeks', 'Monthly', 'Today'
    )).required(),
    reminders: Joi.string(),
}).options({ abortEarly: false });

export const updateGoalSchema = Joi.object({
    goalId: Joi.string().required(),
    title: Joi.string(),
    description: Joi.string(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    completed: Joi.boolean().default(false),
    completedToday: Joi.boolean().default(false),
    goalStatus: Joi.array().items(Joi.string().valid(
        'not_started', 'in_progress', 'completed')),
    dayFrequency: Joi.array().items(Joi.string().valid(
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Daily', 'evenWeeks', 'oddWeeks', 'Monthly', 'Today'
    )),
}).options({ abortEarly: false });