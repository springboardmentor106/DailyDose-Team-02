import Caretaker from '../models/caretakerModel.js';
import REMINDER from '../models/reminderModel.js';
import User from '../models/userModel.js';
import sendNotification from './sendNotification.js';
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
            return res.status(401).json({ status: "failed", message: "User not found" });
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

        // send notification to the user
        const sendNotificationResult = await sendNotification({
            title: `New Reminder Set! `,
            description: "You will be notified to complete " + req.body.title,
            userId: userId,
            belongTo: "reminder"
        })

        if (!sendNotificationResult) {
            console.log("notification not sent when created goal", sendNotificationResult)
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
            return res.status(401).json({ status: "failed", message: "User not found" });
        }

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
            if (endDate < dateStr) {
                reminders[i].completed = true
                reminders[i].save()
            }

            if (!reminders[i].completedToday) {
                const date = new Date();
                const lastNotificationSent = new Date(reminders[i].lastSentNotification)
                date.setHours(reminders[i].startTime.split(":")[0]);
                date.setMinutes(reminders[i].startTime.split(":")[1]);
                date.setSeconds(0); // Optional: if you want to reset seconds to zero
                if (lastNotificationSent.getFullYear() <= date.getFullYear() &&
                    lastNotificationSent.getMonth() <= date.getMonth() &&
                    lastNotificationSent.getDate() <= date.getDate()) {

                    // send notification to the user
                    const sendNotificationResult = await sendNotification({
                        title: `${reminders[i].title}`,
                        description: `Don't Forget! You Have to ${reminders[i].title}`,
                        userId: userId,
                        belongTo: "reminder"
                    })

                    if (!sendNotificationResult) {
                        console.log("notification not sent when created goal", sendNotificationResult)
                    }
                    reminders[i].pushNotification = true
                    reminders[i].save()
                }
                console.log(new Date().getTime() > date.getTime(), date.getHours(), date.getMinutes(), reminders[i].startTime)
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
            return res.status(401).json({ message: "User not found" });
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
            return res.status(401).res.json({ message: "User not found" });
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



export const getMonthlyReminderStat = async (req, res) => {
    try {
        const { userId, role } = req;
        if (!userId || !role) {
            return res.status(400).json({ status: "failed", message: "User ID and role are required" });
        }

        const { seniorCitizenId, year } = req.body;
        if (!year) {
            return res.status(400).json({ status: "failed", message: "Year is required in the request body" });
        }

        let seniorId;
        if (role === 'user') {
            seniorId = userId;
        } else if (role === 'caretaker') {
            seniorId = seniorCitizenId;
            const caretaker = await Caretaker.findOne({ uuid: userId });
            if (!caretaker) {
                return res.status(404).json({ status: "failed", message: `Caretaker not found for ID: ${userId}` });
            }
            const senior = await User.findById(seniorId);
            if (!senior) {
                return res.status(404).json({ status: "failed", message: `Senior user not found for ID: ${seniorId}` });
            }
        } else {
            return res.status(403).json({ status: "failed", message: "Unauthorized" });
        }

        const monthsData = [];

        for (let month = 0; month < 12; month++) {
            const firstDayOfMonth = new Date(year, month, 1);
            const lastDayOfMonth = new Date(year, month + 1, 0);

            const monthName = firstDayOfMonth.toLocaleString('default', { month: 'long' });

            const reminders = await REMINDER.find({
                userId: seniorId,
                startDate: { $lte: lastDayOfMonth },
                $or: [
                    { endDate: { $exists: false } },
                    { endDate: { $gte: firstDayOfMonth } }
                ]
            });

            let totalReminder = 0;
            let totalCompletedDays = 0;
            let totalSkippedDays = 0;

            for (const reminder of reminders) {
                const start = reminder.startDate < firstDayOfMonth ? firstDayOfMonth : reminder.startDate;
                const end = reminder.endDate ? (reminder.endDate > lastDayOfMonth ? lastDayOfMonth : reminder.endDate) : lastDayOfMonth;

                const daysInMonth = (end - start) / (1000 * 60 * 60 * 24) + 1;

                totalReminder += daysInMonth;
                if (reminder.completed) {
                    totalCompletedDays += daysInMonth;
                } else {
                    totalSkippedDays += daysInMonth;
                }
            }

            const completePercentage = totalReminder > 0 ? (totalCompletedDays / totalReminder) * 100 : 0;

            monthsData.push({
                month: monthName,
                totalReminder,
                completedDays: totalCompletedDays,
                skippedDays: totalSkippedDays,
                completePercentage: parseFloat(completePercentage.toFixed(2))
            });
        }

        return res.status(200).json({
            status: "success",
            userId: seniorId,
            role,
            year,
            monthsData
        });
    } catch (error) {
        console.error('Error fetching monthly reminder stats:', error);
        res.status(500).json({ status: "error", message: "Failed to retrieve monthly reminder stats" });
    }
};