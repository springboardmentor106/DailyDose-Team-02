import Notification from "../models/notificationModel.js"; // Replace with actual path to your model

export const createNotification = async (req, res) => {
    try {
        // const { userId, role } = req;
        const { title, description, userId, belongTo } = req.body;
        if (!userId) {
            return res.status(400).json({ status: "failed", message: "UUID not captured" });
        }

        const newNotification = {
            title: title,
            description: description,
            belongTo: belongTo
        };

        const result = await Notification.findOneAndUpdate(
            { userId: userId },
            { $push: { notification: newNotification } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        if (!result) {
            return res.status(400).json({ status: "failed", message: "Error while updating the notifications." })
        }

        return res.status(200).json({ status: "success", message: "Notification created/updated successfully" });
    } catch (err) {
        return res.status(500).json({ status: "failed", message: "Internal server error: " + err });
    }
};

export const getAllNotifications = async (req, res) => {
    try {
        const { userId } = req
        if (!userId) {
            return res.status(400).json({ status: "failed", message: "UUID not captured" });
        }

        const result = await Notification.findOne({ userId: userId })
        const notifications = { ...Notification, notification: result?.notification.reverse()  || []}
        return res.status(200).json({ status: "success", notifications: result ? result : [] });
    } catch (err) {
        return res.status(500).json({ status: "failed", message: "Internal server error: " + err });
    }
};

export const updateNotification = async (req, res) => {
    try {
        const { userId } = req;
        const { notificationId } = req.body;

        if (!userId) {
            return res.status(400).json({ status: "failed", message: "UUID not captured" });
        }

        if (!notificationId) {
            return res.status(400).json({ status: "failed", message: "notification id not found" });
        }

        const notificationDoc = await Notification.findOne({ userId: userId });
        if (!notificationDoc) {
            return res.status(404).json({ status: "failed", message: "notification not found" });
        }

        const notificationIndex = notificationDoc.notification.findIndex(n => n._id.toString() === notificationId);
        if (notificationIndex === -1) {
            return res.status(404).json({ status: "failed", message: "notification id not found in notifications" });
        }

        notificationDoc.notification[notificationIndex].actionTaken = true;
        await notificationDoc.save();

        return res.status(200).json({ status: "success", message: "notification updated successfully" });
    } catch (err) {
        return res.status(500).json({ status: "failed", message: "Internal server error: " + err.message });
    }
};
