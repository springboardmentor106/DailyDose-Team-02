import { Joi } from "express-validation";

export const createGoalSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    targetDate: Joi.date().required(),
    completed: Joi.boolean().default(false),
    reminders: Joi.string(),
    dayFrequency: Joi.array().items(Joi.string().valid(
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Daily', 'evenWeeks', 'oddWeeks', 'Monthly', 'Today'
    )).required()
});

export const updateGoalSchema = Joi.object({
    goalId: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    targetDate: Joi.date().required(),
    completed: Joi.boolean().default(false),
    reminders: Joi.string(),
    dayFrequency: Joi.array().items(Joi.string().valid(
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Daily', 'evenWeeks', 'oddWeeks', 'Monthly', 'Today'
    )).required()
});