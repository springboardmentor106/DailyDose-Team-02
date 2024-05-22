// import Joi from "joi";
import { Joi } from "express-validation";

export const newUserEmailOtpSchema = Joi.object({
    email: Joi.string().required(),
    // role: Joi.string().valid('user', 'caretaker').required(),
}).options({ abortEarly: false })

export const userRegistrationSchema = Joi.object({

    // common in senior, caretaker
    enteredOtp: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    gender: Joi.string().valid('male', 'female', 'other').lowercase(),
    age: Joi.number().integer().min(18).required(),
    role: Joi.string().valid('user', 'caretaker').required(),
    phoneNumber: Joi.number(),
    
    // senior specific
    reminders: Joi.array().items(Joi.string()),
    goals: Joi.array().items(Joi.string()),
    habits: Joi.array().items(Joi.string()),
    caretaker: Joi.string(),
    caretaketAssigned: Joi.boolean(),
    
    // caretaker specific
    assignedSeniors: Joi.array().items(Joi.string()),


    // not used currently
    // address: Joi.string(),
    // country: Joi.string(),
    // pincode: Joi.number(),
}).options({ abortEarly: false });

export const updateUserSchema = Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    age: Joi.number().integer().min(18),
    gender: Joi.string().valid('male', 'female', 'other').lowercase(),
    phoneNumber: Joi.number(),
    // address: Joi.string(),
    // country: Joi.string(),
    // pincode: Joi.number(),
}).options({ abortEarly: false });

export const userLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('user', 'caretaker').required(),
}).options({ abortEarly: false })

export const changeUserPasswordSchema = Joi.object({
    password: Joi.string().required(),
    password_confirm: Joi.string().required(),
}).options({ abortEarly: false })

export const userPasswordResetEmailSchema = Joi.object({
    email: Joi.string().required(),
    role: Joi.string().valid('user', 'caretaker').required(),
    // otp: Joi.string().required()
}).options({ abortEarly: false })

export const validateOtpSchema = Joi.object({
    email: Joi.string().required(),
    otp: Joi.string().length(6).required(),
}).options({ abortEarly: false })

export const userPasswordResetSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    role: Joi.string().valid('user', 'caretaker').required(),
}).options({ abortEarly: false })