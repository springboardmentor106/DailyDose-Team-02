import express from 'express';
import {
    createGoal,
    updateGoal,
    deleteGoal,
    getUserGoals,
    getMonthlyGoalProgress,
    getDailyGoalProgress,
    deleteAllGoal
} from '../controllers/goalController.js';
import { validation } from '../middlewares/validationMiddleware.js';
import { createGoalSchema, updateGoalSchema } from '../validations/userGoalValidation.js';
import checkUserAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', validation(createGoalSchema), checkUserAuth, createGoal);
router.post('/getTodayGoals', checkUserAuth, getUserGoals);
router.patch('/update', validation(updateGoalSchema), checkUserAuth, updateGoal);
router.delete('/delete', checkUserAuth, deleteGoal);
router.post('/monthly-stats', checkUserAuth, getMonthlyGoalProgress)
router.post('/daily-stats', checkUserAuth, getDailyGoalProgress)
router.delete('/delete-all', checkUserAuth, deleteAllGoal)


// router.post('/goals', checkUserAuth, validateUserOrCaretaker, createGoal);
// router.get('/goals', checkUserAuth, validateUserOrCaretaker, getGoals);
// router.patch('/goals/:id', checkUserAuth, validateUserOrCaretaker, updateGoal);
// router.delete('/goals/:id', checkUserAuth, validateUserOrCaretaker, deleteGoal);

export default router;