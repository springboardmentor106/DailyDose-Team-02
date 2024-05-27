import express from 'express';
import { createNotification } from '../controllers/notificationController.js';
import checkUserAuth from '../middlewares/authMiddleware.js';
import { validation } from '../middlewares/validationMiddleware.js';
import { createNotificationSchema } from '../validations/notificationValidation.js';

const router = express.Router();

router.post('/', validation(createNotificationSchema), checkUserAuth, createNotification);

export default router;