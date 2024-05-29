import express from 'express';
import { createNotification, getAllNotifications, updateNotification } from '../controllers/notificationController.js';
import checkUserAuth from '../middlewares/authMiddleware.js';
import { validation } from '../middlewares/validationMiddleware.js';
import { createNotificationSchema } from '../validations/notificationValidation.js';

const router = express.Router();

router.post('/', validation(createNotificationSchema), createNotification);
router.get('/', checkUserAuth, getAllNotifications);
router.patch('/', checkUserAuth, updateNotification);

export default router;