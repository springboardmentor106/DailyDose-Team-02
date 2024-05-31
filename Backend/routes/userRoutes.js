import {
    deleteUser,
    // getUserDetailsByUuidAndRole,
    newUserEmailOtp,
    readUserDetail,
    updateUser,
    userLogin,
    userPasswordReset,
    userPasswordResetEmail,
    userRegistration,
    validateOtp
} from '../controllers/userController.js';
import checkUserAuth from '../middlewares/authMiddleware.js';
import express from 'express';
// import { validate } from 'express-validation';
import {
    newUserEmailOtpSchema,
    updateUserSchema,
    userLoginSchema,
    userPasswordResetEmailSchema,
    userPasswordResetSchema,
    userRegistrationSchema, validateOtpSchema
} from '../validations/userValidation.js';
import { validation } from '../middlewares/validationMiddleware.js';

const router = express.Router();

// Public Routes  e.g --> Register
router.post('/new-user', validation(newUserEmailOtpSchema), newUserEmailOtp)
router.post('/register', validation(userRegistrationSchema), userRegistration)
router.post('/login', validation(userLoginSchema), userLogin)
router.post('/reset-password-email', validation(userPasswordResetEmailSchema), userPasswordResetEmail)
router.post('/validate-otp', validation(validateOtpSchema), validateOtp)


// Protected Routes
// router.post('/user/details/:uuid/:role', checkUserAuth, getUserDetailsByUuidAndRole);
router.post('/reset-password', validation(userPasswordResetSchema),  userPasswordReset)
router.patch('/update-profile', validation(updateUserSchema), checkUserAuth, updateUser)
router.get('/profile', checkUserAuth, readUserDetail)
router.delete('/delete-profile', checkUserAuth, deleteUser)
// router.post('/assign-user', checkUserAuth);
// router.get('/dummy', checkUserAuth, (req, res)=>{
//     res.send('I am dummy')
// })

export default router