import Joi from 'joi';

export const createGoalSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    targetDate: Joi.date().allow(null),
    completed: Joi.boolean().default(false),
    reminders: Joi.string(),
    dayFrequency: Joi.array().items(Joi.string().valid(
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Daily', 'evenWeeks', 'oddWeeks', 'Monthly'
    ))
});

export const updateGoalSchema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    targetDate: Joi.date().allow(null),
    completed: Joi.boolean().default(false),
    reminders: Joi.string(),
    dayFrequency: Joi.array().items(Joi.string().valid(
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Daily', 'evenWeeks', 'oddWeeks', 'Monthly'
    ))
});