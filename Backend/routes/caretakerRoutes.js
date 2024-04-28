import express from 'express'
const router = express.Router();
import caretakerController from '../controllers/caretakerController.js';


// Public Routes  e.g --> Register
router.post('/register', caretakerController.caretakerRegistration)
router.post('/login', caretakerController.caretakerLogin)

// Protected Routes e.g ---> Dashboard


export default router