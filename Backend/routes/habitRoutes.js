import express from 'express';
import { createHabit, getHabits, updateHabit, deleteHabit } from '../controllers/habitController.js';
import checkUserAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to create a new habit
router.post('/', checkUserAuth, createHabit);

// Route to get all habits
router.get('/', checkUserAuth, getHabits);

// Route to update a habit by ID
router.patch('/:id', checkUserAuth, updateHabit);

// Route to delete a habit by ID
router.delete('/:id', checkUserAuth, deleteHabit);

export default router;
