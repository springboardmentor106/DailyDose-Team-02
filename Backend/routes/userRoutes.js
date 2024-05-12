import UserController from '../controllers/userController.js';
import CaretakerController from '../controllers/caretakerController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';
import express from 'express'


const router = express.Router();


// Public Routes  e.g --> Register
router.post('/new-user', UserController.newUserEmailOtp)
router.post('/register', UserController.userRegistration)
router.post('/login', UserController.userLogin)
router.post('/reset-password-email', UserController.UserPasswordResetEmail)
router.post('/validate-otp', UserController.validateOtp)
router.post('/reset-password', UserController.userPasswordReset)


// Private Routes
router.post('/user/details/:uuid/:role', UserController.getUserDetailsByUuidAndRole);

router.post('/assign-user', checkUserAuth, UserController.assignUserToCaretaker);


export default router