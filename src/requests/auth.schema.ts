import Joi from 'joi';

export const BusinessSignUpSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    address: Joi.string().required(),
    pincode: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    password: Joi.string().min(8).required()
});

export const BusinessSignInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

export const VerifyEmailSchema = Joi.object({
    token: Joi.string().required()
});

export const ResendEmailVerificationSchema = Joi.object({
    email: Joi.string().email().required()
});