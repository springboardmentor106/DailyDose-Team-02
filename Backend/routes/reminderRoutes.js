import express from 'express';
import { createReminder, getReminders, updateReminder, deleteReminder } from '../controllers/reminderController.js';
import checkUserAuth from '../middlewares/authMiddleware.js';
import { validation } from '../middlewares/validationMiddleware.js';
import { createReminderSchema, updateReminderSchema } from  '../validations/userReminderValidation.js'

const router = express.Router();

router.post('/', validation(createReminderSchema), checkUserAuth, createReminder);
router.get('/', checkUserAuth, getReminders);
router.patch('/:id', validation(updateReminderSchema), checkUserAuth, updateReminder);
router.delete('/:id', checkUserAuth, deleteReminder);


// router.post('/reminder', checkUserAuth, validateUserOrCaretaker,createReminder );
// router.get('/reminder', checkUserAuth, validateUserOrCaretaker,getReminders );
// router.patch('/reminder/:id', checkUserAuth, validateUserOrCaretaker,updateReminder );
// router.delete('/reminder/:id', checkUserAuth, validateUserOrCaretaker, deleteReminder);

export default router;