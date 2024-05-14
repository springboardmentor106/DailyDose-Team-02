import express from 'express'
import { caretakerLogin, caretakerRegistration } from '../controllers/caretakerController.js';
import { validation } from '../middlewares/validationMiddleware.js';
import { caretakerLoginSchema, caretakerRegistrationSchema } from '../validations/caretakerValidation.js';


const router = express.Router();

// Public Routes  e.g --> Register
router.post('/register', validation(caretakerRegistrationSchema), caretakerRegistration)
router.post('/login', validation(caretakerLoginSchema), caretakerLogin)

// Protected Routes e.g ---> Dashboard

export default router