import Notification from "../models/notificationModel.js";
import User from "../models/userModel.js";

// Create or update a notification for caretaker
export const createCaretakerNotification = async (req, res) => {
    try {
        const { title, description, userId, belongTo, eventType } = req.body;
        if (!userId) {
            return res.status(400).json({ status: "failed", message: "UUID not captured" });
        }

        // Find the user to get the caretakerId
        const user = await User.findById(userId).populate('caretakerId');
        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }

        const caretakerId = user.caretakerId;
        if (!caretakerId) {
            return res.status(404).json({ status: "failed", message: "Caretaker not assigned to this user" });
        }

        const newNotification = {
            title: title,
            description: description,
            belongTo: belongTo,
            eventType: eventType // e.g., 'goal_started', 'goal_completed', 'reminder_started', 'reminder_completed'
        };

        const result = await Notification.findOneAndUpdate(
            { userId: caretakerId },
            { $push: { notification: newNotification } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        if (!result) {
            return res.status(400).json({ status: "failed", message: "Error while updating the notifications." });
        }

        return res.status(200).json({ status: "success", message: "Notification created/updated successfully" });
    } catch (err) {
        return res.status(500).json({ status: "failed", message: "Internal server error: " + err });
    }
};

// Get all notifications for a caretaker
export const getAllCaretakerNotifications = async (req, res) => {
    try {
        const { userId } = req;
        if (!userId) {
            return res.status(400).json({ status: "failed", message: "UUID not captured" });
        }

        const result = await Notification.findOne({ userId: userId });

        return res.status(200).json({ status: "success", notifications: result ? result.notification : [] });
    } catch (err) {
        return res.status(500).json({ status: "failed", message: "Internal server error: " + err });
    }
};

// Update a notification for caretaker
export const updateCaretakerNotification = async (req, res) => {
    try {
        const { userId } = req;
        const { notificationId } = req.body;

        if (!userId) {
            return res.status(400).json({ status: "failed", message: "UUID not captured" });
        }

        if (!notificationId) {
            return res.status(400).json({ status: "failed", message: "Notification ID not found" });
        }

        const notificationDoc = await Notification.findOne({ userId: userId });
        if (!notificationDoc) {
            return res.status(404).json({ status: "failed", message: "Notification not found" });
        }

        const notificationIndex = notificationDoc.notification.findIndex(n => n._id.toString() === notificationId);
        if (notificationIndex === -1) {
            return res.status(404).json({ status: "failed", message: "Notification ID not found in notifications" });
        }

        notificationDoc.notification[notificationIndex].actionTaken = true;
        await notificationDoc.save();

        return res.status(200).json({ status: "success", message: "Notification updated successfully" });
    } catch (err) {
        return res.status(500).json({ status: "failed", message: "Internal server error: " + err.message });
    }
};
