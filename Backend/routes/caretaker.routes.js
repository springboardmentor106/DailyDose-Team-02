import express from 'express'
const router = express.Router();
import CaretakerController from '../controllers/caretaker.controller.js';


// Public Routes  e.g --> Register
router.post('/register', CaretakerController.caretakerRegistration)
router.post('/login', CaretakerController.caretakerLogin)

// Protected Routes e.g ---> Dashboard


export default router