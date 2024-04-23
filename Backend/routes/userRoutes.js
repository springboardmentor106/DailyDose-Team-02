import express from 'express'
const router = express.Router();
import userController from '../controllers/userController.js';
import caretakerController from '../controllers/caretakerController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';


// Middleware - To protect
router.use('/changepassword', checkUserAuth)
router.use('/loggeduser', checkUserAuth)

// Public Routes  e.g --> Register
router.post('/register', userController.userRegistration)
router.post('/login', userController.userLogin)
router.post('/reset-password-email', userController.userPasswordResetEmail)
router.post('/reset-password/:id/:token', userController.userPasswordReset)

// Protected Routes e.g ---> Dashboard
router.post('/changepassword', userController.changeUserPassword)
router.get('/loggeduser', userController.loggedUser)

export default router