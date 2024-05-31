import { Joi } from "express-validation";

export const createGoalSchema = Joi.object({
    title: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    dayFrequency: Joi.array().items(Joi.string().valid(
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
        'Daily', 'Today'
    )),
    completed: Joi.boolean().default(false),
    completedToday: Joi.boolean().default(false),
    pushNotification: Joi.boolean().default(false),
    seniorCitizenId: Joi.string()
});

export const updateGoalSchema = Joi.object({
    goalId: Joi.string().required(),
    title: Joi.string(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    dayFrequency: Joi.array().items(Joi.string().valid(
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
        'Daily', 'Today'
    )),
    completed: Joi.boolean().default(false),
    completedToday: Joi.boolean().default(false),
    pushNotification: Joi.boolean().default(false)
});