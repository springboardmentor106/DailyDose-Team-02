import express from 'express';
import {
    createCaretakerNotification,
    getAllCaretakerNotifications,
    updateCaretakerNotification
} from '../controllers/caretakerNotificationController.js';
import checkUserAuth from '../middlewares/authMiddleware.js';
import { validation } from '../middlewares/validationMiddleware.js';
import { createNotificationSchema } from '../validations/notificationValidation.js';

const router = express.Router();

router.post('/', validation(createNotificationSchema), checkUserAuth, createCaretakerNotification);
router.get('/', checkUserAuth, getAllCaretakerNotifications);
router.put('/', checkUserAuth, updateCaretakerNotification);

export default router;