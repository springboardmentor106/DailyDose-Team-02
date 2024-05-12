import UserController from '../controllers/userController.js';
import CaretakerController from '../controllers/caretakerController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';
import express from 'express'


const router = express.Router();


// Middleware - To protect
router.use('/changepassword', checkUserAuth)
router.use('/loggeduser', checkUserAuth)


// Public Routes  e.g --> Register
router.post('/new-user', UserController.newUserEmailOtp)
router.post('/register', UserController.userRegistration)
router.post('/login', UserController.userLogin)
router.post('/reset-password-email', UserController.userPasswordResetEmail)
router.post('/validate-otp', UserController.validateOtp)
router.post('/reset-password', UserController.userPasswordReset)


// router.post('/reset-password/:id/:token', UserController.userPasswordReset)
router.get('/reset-password/:id/:token', UserController.resetPasswordPage)


// Protected Routes e.g ---> Dashboard
router.post('/changepassword', UserController.changeUserPassword)
router.get('/loggeduser', UserController.loggedUser)

// routes for getting user details
router.get('/get-all-users', UserController.getAllUserDetails);
router.post('/edit-profile', UserController.editProfile);

export default router