import express from 'express';
import { createReminder, getReminders, updateReminder, deleteReminder, getMonthlyReminderStat, getDailyReminderProgress } from '../controllers/reminderController.js';
import checkUserAuth from '../middlewares/authMiddleware.js';
import { validation } from '../middlewares/validationMiddleware.js';
import { createReminderSchema, updateReminderSchema } from  '../validations/userReminderValidation.js'

const router = express.Router();

router.post('/', validation(createReminderSchema), checkUserAuth, createReminder);
router.post('/get-reminders', checkUserAuth, getReminders);
router.patch('/update', validation(updateReminderSchema), checkUserAuth, updateReminder);
router.delete('/delete', checkUserAuth, deleteReminder);
router.post('/monthly-stat', checkUserAuth, getMonthlyReminderStat)
router.get('/daily-stat', checkUserAuth, getDailyReminderProgress)

export default router;