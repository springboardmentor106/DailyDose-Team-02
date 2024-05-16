import express from 'express'
import { assignUser, caretakerLogin, caretakerRegistration, createUserGoal, getAllUnassignedUser } from '../controllers/caretakerController.js';
import { validation } from '../middlewares/validationMiddleware.js';
import { caretakerLoginSchema, caretakerRegistrationSchema } from '../validations/caretakerValidation.js';
import checkUserAuth from '../middlewares/authMiddleware.js';
import { createGoalSchema } from '../validations/userGoalValidation.js';

const router = express.Router();

// Public Routes  e.g --> Register
router.post('/register', validation(caretakerRegistrationSchema), caretakerRegistration)
router.post('/login', validation(caretakerLoginSchema), caretakerLogin)

// Protected Routes e.g ---> Dashboard
router.get('/all-unassigned-user', checkUserAuth, getAllUnassignedUser)
router.post('/assign-user', checkUserAuth, assignUser)
router.post('/create-user-goal', validation(createGoalSchema), checkUserAuth, createUserGoal)


export default router