import express from 'express';
import { createHabit, getHabits, updateHabit, deleteHabit } from '../controllers/habitController.js';

const router = express.Router();

// Route to create a new habit
router.post('/', createHabit);

// Route to get all habits
router.get('/', getHabits);

// Route to update a habit by ID
router.patch('/:id', updateHabit);

// Route to delete a habit by ID
router.delete('/:id', deleteHabit);

export default router;
