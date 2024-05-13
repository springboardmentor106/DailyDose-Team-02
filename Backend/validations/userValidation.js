import Joi from "joi";

export const newUserEmailOtpSchema = Joi.object({
    email: Joi.string().required(),
    role: Joi.string().valid('user', 'caretaker').required(),
})

export const userRegistrationSchema = Joi.object({
    enteredOtp: Joi.string().required(),
    role: Joi.string().valid('user', 'caretaker').required(),

    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    age: Joi.number().integer().min(18).required(),

    gender: Joi.string().valid('male', 'female', 'other').lowercase(),
    phoneNumber: Joi.number(),
    address: Joi.string(),
    country: Joi.string(),
    pincode: Joi.number(),
    reminders: Joi.array().items(Joi.string()),
    goals: Joi.array().items(Joi.string()),
});

export const userLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('user', 'caretaker').required(),
})

export const changeUserPasswordSchema = Joi.object({
    password: Joi.string().required(),
    password_confirm: Joi.string().required(),
})

export const userPasswordResetEmailSchema = Joi.object({
    email: Joi.string().required(),
    role: Joi.string().valid('user', 'caretaker').required(),
})

export const validateOtpSchema = Joi.object({
    email: Joi.string().required(),
    otp: Joi.string().length(6).required(),
})

export const userPasswordResetSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    role: Joi.string().valid('user', 'caretaker').required(),
})