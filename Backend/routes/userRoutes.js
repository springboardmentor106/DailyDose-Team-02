import {
    getUserDetailsByUuidAndRole,
    newUserEmailOtp,
    userLogin,
    userPasswordReset,
    userPasswordResetEmail,
    userRegistration
} from '../controllers/userController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';
import express from 'express';
// import { validate } from 'express-validation';
import {
    newUserEmailOtpSchema,
    userLoginSchema,
    userPasswordResetEmailSchema,
    userPasswordResetSchema,
    userRegistrationSchema
} from '../validations/userValidation.js';
import { validation } from '../middlewares/validationMiddleware.js';

const router = express.Router();

// Public Routes  e.g --> Register
router.post('/new-user', validation(newUserEmailOtpSchema), newUserEmailOtp)
router.post('/register', validation(userRegistrationSchema), userRegistration)
router.post('/login', validation(userLoginSchema), userLogin)
router.post('/reset-password-email', validation(userPasswordResetEmailSchema), userPasswordResetEmail)
router.post('/validate-otp', validation(userPasswordResetEmailSchema), userPasswordResetEmail)
router.post('/reset-password', validation(userPasswordResetSchema), userPasswordReset)


// Private Routes
router.post('/user/details/:uuid/:role', getUserDetailsByUuidAndRole);

router.post('/assign-user', checkUserAuth);


export default router