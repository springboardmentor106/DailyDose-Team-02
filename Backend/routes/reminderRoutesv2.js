import express from 'express';
import { createReminder, getReminders, updateReminder, deleteReminder } from '../controllers/reminderController.js';
import checkUserAuth from '../middlewares/authMiddleware.js';
import { validation } from '../middlewares/validationMiddleware.js';
import { createReminderSchemav2, updateReminderSchema } from  '../validations/userReminderValidation.js'

const router = express.Router();

router.post('/', validation(createReminderSchemav2), checkUserAuth, createReminder);
router.get('/', checkUserAuth, getReminders);
router.patch('/update', validation(updateReminderSchema), checkUserAuth, updateReminder);
router.delete('/delete', checkUserAuth, deleteReminder);

export default router;