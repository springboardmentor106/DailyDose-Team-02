import express from 'express';
import {
    createGoal,
    updateGoal,
    deleteGoal,
    getUserGoals,
    getMonthlyGoalProgress,
    getDailyGoalProgress
} from '../controllers/goalController.js';
import { validation } from '../middlewares/validationMiddleware.js';
import { createGoalSchema, updateGoalSchema } from '../validations/userGoalValidation.js';
import checkUserAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', validation(createGoalSchema), checkUserAuth, createGoal);
router.get('/', checkUserAuth, getUserGoals);
router.patch('/update/:id', validation(updateGoalSchema), checkUserAuth, updateGoal);
router.delete('delete/:id', checkUserAuth, deleteGoal);
router.get('/monthly-stats', checkUserAuth, getMonthlyGoalProgress)
router.get('/daily-stats', checkUserAuth, getDailyGoalProgress)


// router.post('/goals', checkUserAuth, validateUserOrCaretaker, createGoal);
// router.get('/goals', checkUserAuth, validateUserOrCaretaker, getGoals);
// router.patch('/goals/:id', checkUserAuth, validateUserOrCaretaker, updateGoal);
// router.delete('/goals/:id', checkUserAuth, validateUserOrCaretaker, deleteGoal);

export default router;