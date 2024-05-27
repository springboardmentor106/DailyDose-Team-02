import Notification from "../models/notificationModel.js"; // Replace with actual path to your model

export const createNotification = async (req, res) => {
    try {
        const { userId, role } = req;
        const { title, description } = req.body;
        if (!userId) {
            return res.status(400).json({ status: "failed", message: "UUID not captured" });
        }

        const newNotification = {
            title: title,
            description: description,
        };

        const result = await Notification.findOneAndUpdate(
            { userId: userId },
            { $push: { notification: newNotification } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        if (!result){
            return res.status(400).json({status:"failed",message:"Error while updating the notifications."})
        }

        return res.status(200).json({ status: "success", message: "Notification created/updated successfully" });
    } catch (err) {
        return res.status(500).json({ status: "failed", message: "Internal server error: " + err });
    }
};
