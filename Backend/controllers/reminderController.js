import REMINDER from '../models/reminderModel.js';
import User from '../models/userModel.js';

// only user can CRUD
export const createReminder = async (req, res) => {
    try {
        const { userId, role } = req;

        if (role !== 'user') {
            return res.status(403).json({ status: "failed", message: "Only users have access to create habits" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }

        const newReminder = new REMINDER(req.body);
        await newReminder.save();

        user.reminders.push(newReminder._id)
        await user.save()

        return res.status(200).json({ status: "success", message: "Reminders Added Successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

export const getReminders = async (req, res) => {
    try {
        const { userId, role } = req;

        if (role !== 'user') {
            return res.status(403).json({ status: "failed", message: "Only users have access" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }

        let reminders = []
        for (let i = 0; i < user.reminders.length; i++) {
            const reminder = await REMINDER.findById(user.reminders[i])

            reminders.push(reminder)
        }
        res.json(reminders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateReminder = async (req, res) => {
    try {
        const { userId, role } = req;
        const { reminderId, ...body } = req.body
        if (role !== 'user') {
            return res.status(403).json({ status: "failed", message: "Only users have access" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }

        const verifyReminder = user.reminders.includes(reminderId);
        if (!verifyReminder) {
            return res.status(403).json({ status: "failed", message: "Unauthorized to update this reminder" });
        }

        const updateReminder = await REMINDER.findByIdAndUpdate(habitId, body, { new: true });
        if (!updateReminder) {
            return res.status(404).json({ status: "failed", message: "Reminder not found" });
        }

        res.json({ status: "success", message: "Reminder updated" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteReminder = async (req, res) => {
    try {
        const { userId, role } = req;
        const { reminderId } = req.body;

        if (role !== 'user') {
            return res.status(403).json({ status: "failed", message: "Only users have access" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }

        const verifyReminder = user.reminders.includes(reminderId);
        if (!verifyReminder) {
            return res.status(403).json({ status: "failed", message: "Unauthorized to delete this habit" });
        }

        const reminder = await HABIT.findByIdAndDelete(reminderId);
        if (!reminder) {
            return res.status(404).json({ status: "failed", message: 'reminder not found' });
        }
        res.json({ status: "success", message: 'Reminder deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }

};