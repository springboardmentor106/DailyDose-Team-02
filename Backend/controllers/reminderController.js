import REMINDER from '../models/reminderModel.js';
import User from '../models/userModel.js';
import sendNotification from './sendNotification.js';
import { createCaretakerNotification } from '../controllers/caretakerNotificationController.js';
import Reminder from '../models/reminderModel.js';

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


// Function to start a reminder
export const startReminder = async (req, res) => {
    try {
        const { userId, reminderId } = req.body;

        // Logic to start the reminder...
        const reminder = await Reminder.findById(reminderId);
        if (!reminder) {
            return res.status(404).json({ status: "failed", message: "Reminder not found" });
        }

        reminder.started = true;
        await reminder.save();

        // Create a notification for the caretaker
        await createCaretakerNotification({
            body: {
                title: 'New Reminder Started',
                description: 'The user has started a new reminder.',
                userId: userId,
                belongTo: 'reminder',
                eventType: 'reminder_started'
            }
        }, res);

        return res.status(200).json({ status: "success", message: "Reminder started successfully" });
    } catch (err) {
        return res.status(500).json({ status: "failed", message: "Internal server error: " + err });
    }
};

// Function to complete a reminder
export const completeReminder = async (req, res) => {
    try {
        const { userId, reminderId } = req.body;

        // Logic to complete the reminder...
        const reminder = await Reminder.findById(reminderId);
        if (!reminder) {
            return res.status(404).json({ status: "failed", message: "Reminder not found" });
        }

        reminder.completed = true;
        await reminder.save();

        // Create a notification for the caretaker
        await createCaretakerNotification({
            body: {
                title: 'Reminder Completed',
                description: 'The user has completed a reminder.',
                userId: userId,
                belongTo: 'reminder',
                eventType: 'reminder_completed'
            }
        }, res);

        return res.status(200).json({ status: "success", message: "Reminder completed successfully" });
    } catch (err) {
        return res.status(500).json({ status: "failed", message: "Internal server error: " + err });
    }
};
