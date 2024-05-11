import express from 'express';
import { createReminder, getReminders, updateReminder, deleteReminder } from '../controllers/reminderController.js';

const router = express.Router();

router.post('/', createReminder);
router.get('/', getReminders);
router.patch('/:id', updateReminder);
router.delete('/:id', deleteReminder);


// router.post('/reminder', checkUserAuth, validateUserOrCaretaker,createReminder );
// router.get('/reminder', checkUserAuth, validateUserOrCaretaker,getReminders );
// router.patch('/reminder/:id', checkUserAuth, validateUserOrCaretaker,updateReminder );
// router.delete('/reminder/:id', checkUserAuth, validateUserOrCaretaker, deleteReminder);

export default router;