import REMINDER from '../models/reminderModel.js';
import User from '../models/userModel.js';

// only user can CRUD
export const createReminder = async (req, res) => {
    try {
        const { userId, role } = req;

        if (!userId) {
            return res.status(404).json({ status: "failed", message: "uuid not captured" });
        }

        if (!role) {
            return res.status(404).json({ status: "failed", message: "role not captured" });
        }

        if (role !== 'user') {
            return res.status(403).json({ status: "failed", message: "Only users have access to create reminder" });
        }

        const user = await User.findOne({ uuid: userId });
        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }

        const newReminder = new REMINDER(req.body);
        const savedReminder = await newReminder.save();
        console.log(savedReminder)
        if (!savedReminder) {
            return res.status(400).json({ status: "failed", message: "Error while creating reminder try again!" });
        }

        user.reminders.push(newReminder.uuid)
        const savedUser = await user.save()
        if (!savedUser) {
            return res.status(400).json({ status: "failed", message: "Error while updating the user reminder try again!" });
        }

        return res.status(200).json({ status: "success", message: "Reminder Added Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "failed", message: error.message });
    }
};

export const getReminders = async (req, res) => {
    try {
        const { userId, role } = req;

        if (!userId) {
            return res.status(404).json({ status: "failed", message: "uuid not captured" });
        }

        if (!role) {
            return res.status(404).json({ status: "failed", message: "role not captured" });
        }

        // if (role !== 'user') {
        //     return res.status(403).json({ status: "failed", message: "Only users have access" });
        // }

        const user = await User.findOne({ uuid: userId });
        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }

        let reminders = []
        let reminderLength = user.reminders.length
        for (let i = 0; i < reminderLength; i++) {
            const reminder = await REMINDER.findOne({uuid: user.reminders[i]})
            reminder ? reminders.push(reminder) : null
        }
        res.json({ status: "success", reminders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateReminder = async (req, res) => {
    try {
        const { userId, role } = req;

        const { reminderId, ...body } = req.body

        if (!userId) {
            return res.status(404).json({ status: "failed", message: "uuid not captured" });
        }

        if (!role) {
            return res.status(404).json({ status: "failed", message: "role not captured" });
        }

        if (role !== 'user') {
            return res.json({ message: "Only users have access" });
        }

        const user = await User.findOne({ uuid: userId });
        if (!user) {
            return res.json({ message: "User not found" });
        }

        const verifyReminder = user.reminders.includes(reminderId);
        if (!verifyReminder) {
            return res.json({ message: "Unauthorized to update this reminder" });
        }

        const updateReminder = await REMINDER.findOneAndUpdate({uuid: reminderId}, body, { new: true });
        if (!updateReminder) {
            return res.status(404).json({ status: "failed", message: "Reminder not found" });
        }

        res.json({ status: "success", message: "Reminder updated" });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: "failed", message: error.message });
    }
};

export const deleteReminder = async (req, res) => {
    try {
        const { userId, role } = req;

        const _id = req.body;

        if (!userId) {
            return res.status(404).json({ status: "failed", message: "uuid not captured" });
        }

        if (!role) {
            return res.status(404).json({ status: "failed", message: "role not captured" });
        }

        if (role !== 'user') {
            return res.json({ message: "Only users have access" });
        }

        const user = await User.findOne({ uuid: userId });
        if (!user) {
            return res.json({ message: "User not found" });
        }

        const reminder = await REMINDER.findByIdAndDelete(_id);
        if (!reminder) {
            return res.status(404).json({ status: "failed", message: 'reminder not found' });
        }

        res.json({ status: "success", message: 'Reminder deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }

};