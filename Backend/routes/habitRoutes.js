import express from 'express';
import { createHabit, getHabits, updateHabit, deleteHabit } from '../controllers/habitController.js';
import checkUserAuth from '../middlewares/authMiddleware.js';
import { validation } from '../middlewares/validationMiddleware.js';
import { createHabitSchema, updateHabitSchema } from '../validations/userHabitValidation.js';

const router = express.Router();

router.post('/', validation(createHabitSchema), checkUserAuth, createHabit);
router.get('/', checkUserAuth, getHabits);
router.patch('/update', validation(updateHabitSchema), checkUserAuth, updateHabit);
router.delete('/delete', checkUserAuth, deleteHabit);

export default router;