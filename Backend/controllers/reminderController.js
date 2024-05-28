import REMINDER from '../models/reminderModel.js';
import User from '../models/userModel.js';
// const getTodayGoals = async ({ userId, caretakerId }) => {
//     try {
//         const today = new Date();
//         const dayOfWeek = today.toLocaleString('en-us', { weekday: 'long' }); // e.g., 'Monday'

//         const todaysGoals = await GOAL.find({
//             createdById: { $in: [userId, caretakerId] },
//             completed: false,
//             $or: [
//                 { dayFrequency: 'Daily' },
//                 { dayFrequency: 'Today' },
//                 { dayFrequency: dayOfWeek }
//             ]
//         });

//         return { todaysGoals, error: null };
//     } catch (error) {
//         return { error: error, todaysGoals: null }
//     }
// };

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

        const newReminder = new REMINDER({ ...req.body, userId: userId });
        const savedReminder = await newReminder.save();
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
        let { seniorCitizenId } = req.body
        if (!userId) {
            return res.status(404).json({ status: "failed", message: "uuid not captured" });
        }

        if (!role) {
            return res.status(404).json({ status: "failed", message: "role not captured" });
        }

        const user = await User.findOne({ uuid: role === "user" ? userId : seniorCitizenId });
        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }

        // let reminders = []
        let reminderLength = user.reminders.length
        // for (let i = 0; i < reminderLength; i++) {
        //     const reminder = await REMINDER.findOne({ uuid: user.reminders[i] })
        //     reminder ? reminders.push(reminder) : null
        // }

        const today = new Date();
        const dayOfWeek = today.toLocaleString('en-us', { weekday: 'long' }); // e.g., 'Monday'

        const reminders = await REMINDER.find({
            userId: role === "user" ? userId : seniorCitizenId,
            completed: false,
            $or: [
                { dayFrequency: 'Daily' },
                { dayFrequency: 'Today' },
                { dayFrequency: dayOfWeek }
            ]
        });


        const dateStr = new Date().toISOString().split('T')[0]
        for (let i = 0; i < reminders.length; i++) {
            const endDate = reminders[i].endDate.toISOString().split('T')[0]
            console.log(dateStr, endDate, endDate < dateStr)
            if (endDate < dateStr) {
                reminders[i].completed = true
                reminders[i].save()
            }
        }

        return res.json({ status: "success", reminders });
    } catch (error) {
        return res.status(500).json({ message: error.message });
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

        const updateReminder = await REMINDER.findOneAndUpdate({ uuid: reminderId }, body, { new: true });
        if (!updateReminder) {
            return res.status(404).json({ status: "failed", message: "Reminder not found" });
        }

        return res.json({ status: "success", message: "Reminder updated" });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ status: "failed", message: error.message });
    }
};

export const deleteReminder = async (req, res) => {
    try {
        const { userId, role } = req;

        const { reminderId } = req.body;

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

        const reminder = await REMINDER.findOneAndDelete({ uuid: reminderId });
        if (!reminder) {
            return res.status(404).json({ status: "failed", message: 'reminder not found' });
        }
        const updatedReminders = user.reminders.filter((reminder) => reminder !== reminderId)
        user.reminders = updatedReminders
        user.save()
        return res.json({ status: "success", message: 'Reminder deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }

};