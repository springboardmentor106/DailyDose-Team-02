import {
    getUserDetailsByUuidAndRole,
    newUserEmailOtp,
    userLogin,
    userPasswordReset,
    userPasswordResetEmail,
    userRegistration
} from '../controllers/userController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';
import express from 'express'


const router = express.Router();


// Public Routes  e.g --> Register
router.post('/new-user', newUserEmailOtp)
router.post('/register', userRegistration)
router.post('/login', userLogin)
router.post('/reset-password-email', userPasswordResetEmail)
router.post('/validate-otp', userPasswordResetEmail)
router.post('/reset-password', userPasswordReset)


// Private Routes
router.post('/user/details/:uuid/:role', getUserDetailsByUuidAndRole);

router.post('/assign-user', checkUserAuth);


export default router