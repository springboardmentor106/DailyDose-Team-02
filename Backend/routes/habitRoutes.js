import express from 'express';
import { createHabit, getHabits, updateHabit, deleteHabit } from '../controllers/habitController.js';
import checkUserAuth from '../middlewares/authMiddleware.js';
import { validation } from '../middlewares/validationMiddleware.js';
import { createHabitSchema, updateHabitSchema } from '../validations/userHabitValidation.js';

const router = express.Router();

// Route to create a new habit
router.post('/', validation(createHabitSchema), checkUserAuth, createHabit);

// Route to get all habits
router.get('/', checkUserAuth, getHabits);

// Route to update a habit by ID
router.patch('/:id', validation(updateHabitSchema), checkUserAuth, updateHabit);

// Route to delete a habit by ID
router.delete('/:id', checkUserAuth, deleteHabit);

export default router;
