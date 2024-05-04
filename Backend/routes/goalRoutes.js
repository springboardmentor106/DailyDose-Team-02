import express from 'express';
// import { checkUserAuth, validateUserOrCaretaker } from '../middlewares/auth-middleware.js';


import { createGoal, getGoals, updateGoal, deleteGoal } from '../controllers/goalController.js';

const router = express.Router();

router.post('/', createGoal);
router.get('/', getGoals);
router.patch('/:id', updateGoal);
router.delete('/:id', deleteGoal);


// router.post('/goals', checkUserAuth, validateUserOrCaretaker, createGoal);
// router.get('/goals', checkUserAuth, validateUserOrCaretaker, getGoals);
// router.patch('/goals/:id', checkUserAuth, validateUserOrCaretaker, updateGoal);
// router.delete('/goals/:id', checkUserAuth, validateUserOrCaretaker, deleteGoal);

export default router;