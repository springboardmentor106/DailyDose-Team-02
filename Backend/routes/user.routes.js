import express from 'express'
const router = express.Router();
import UserController from '../controllers/user.controller.js';
import CaretakerController from '../controllers/caretaker.controller.js';
import checkUserAuth from '../middlewares/auth-middleware.js';


// Middleware - To protect
router.use('/changepassword', checkUserAuth)
router.use('/loggeduser', checkUserAuth)

// Public Routes  e.g --> Register
router.post('/register', UserController.userRegistration)
router.post('/login', UserController.userLogin)
router.post('/reset-password-email', UserController.UserPasswordResetEmail)
router.post('/reset-password/:id/:token', UserController.userPasswordReset)

// Protected Routes e.g ---> Dashboard
router.post('/changepassword', UserController.changeUserPassword)
router.get('/loggeduser', UserController.loggedUser)

export default router