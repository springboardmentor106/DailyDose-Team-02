import Joi from 'joi';

const signUpAndLogin = {
    body: Joi.object({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .required(),
    }),
};

const forgotPassword = {
    body: Joi.object({
        email: Joi.string().email().required()
    })
};

const verifyOtp = {
    body: Joi.object({
        email: Joi.string().email().required(),
        otp: Joi.string().required()
    })
};

export default {
    signUpAndLogin,
    forgotPassword,
    verifyOtp
};
