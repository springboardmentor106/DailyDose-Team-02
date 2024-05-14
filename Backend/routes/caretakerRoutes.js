import express from 'express'
import { caretakerLogin, caretakerRegistration } from '../controllers/caretakerController.js';

const router = express.Router();

// Public Routes  e.g --> Register
router.post('/register', caretakerRegistration)
router.post('/login', caretakerLogin)

// Protected Routes e.g ---> Dashboard


export default router