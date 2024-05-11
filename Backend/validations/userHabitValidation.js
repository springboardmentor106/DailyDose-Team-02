import Joi from 'joi';

export const createHabitSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string()
})

export const updateHabitSchema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string()
})