import Joi from 'joi';

export const caretakerRegistrationSchema = Joi.object({
    firstname: Joi.string().required().trim(),
    lastname: Joi.string().required().trim(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().trim(),
    password_confirm: Joi.string().required().trim(),
    gender: Joi.string().valid('male', 'female', 'other').lowercase(),
    age: Joi.number().integer().min(14).required(),
    assignedSeniors: Joi.array().items(Joi.string().trim())
});

export const caretakerLoginSchema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().trim(),
})