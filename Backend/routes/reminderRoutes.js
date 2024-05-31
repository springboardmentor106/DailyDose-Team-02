import express from 'express';
import { createReminder, getReminders, updateReminder, deleteReminder } from '../controllers/reminderController.js';
import checkUserAuth from '../middlewares/authMiddleware.js';
import { validation } from '../middlewares/validationMiddleware.js';
import { createReminderSchema, updateReminderSchema } from  '../validations/userReminderValidation.js'
import { startReminder, completeReminder } from '../controllers/reminderController.js';
const router = express.Router();

router.post('/', validation(createReminderSchema), checkUserAuth, createReminder);
router.post('/get-reminders', checkUserAuth, getReminders);
router.patch('/update', validation(updateReminderSchema), checkUserAuth, updateReminder);
router.delete('/delete', checkUserAuth, deleteReminder);

router.post('/start-reminder', checkUserAuth, startReminder);
router.post('/complete-reminder', checkUserAuth, completeReminder);



export default router;