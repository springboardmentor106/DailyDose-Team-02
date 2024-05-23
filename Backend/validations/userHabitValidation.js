import { Joi } from "express-validation";

export const createHabitSchema = Joi.object({
    title: Joi.string().required(),
})

export const updateHabitSchema = Joi.object({
    habitId: Joi.string().required(),
    title: Joi.string().required(),
})