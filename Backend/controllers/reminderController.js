import REMINDER from '../models/reminderModel.js';
import { createReminderSchema, updateReminderSchema } from '../validations/userReminder.js';

export const createReminder = async (req, res) => {
    try {
        // validation
        const { error, value } = createReminderSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ status: "failed", message: error.message })
        }

        const newReminder = new REMINDER(value);
        const savedReminder = await newReminder.save();
        return res.status(200).json({ status: "success", message: "Reminders Added Successfully" });

        // res.status(201).json(savedReminder);
        // console.log(newReminder); // Check if newReminder is defined
        // console.log(savedReminder); // Check if savedReminder is defined and has an _id

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getReminders = async (req, res) => {
    try {
        const reminders = await REMINDER.find({ createdBy: req.user._id });
        res.json(reminders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateReminder = async (req, res) => {
    try {
        // validation
        const { error, value } = updateReminderSchema.validate({
            id: req.params.id,
            bodyData: req.body
        })
        if (error) {
            return res.status(400).json({ status: "failed", message: error.message })
        }

        const updatedReminder = await REMINDER.findByIdAndUpdate(value.id, value.bodyData, { new: true });
        if (!updatedReminder) {
            return res.status(404).json({ status: "failed", message: 'Reminder not found' });
        }
        return res.status(200).json({ status: "success", message: "Reminders Updated Successfully" });
        // res.json(updatedReminder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteReminder = async (req, res) => {
    try {
        const reminder = await REMINDER.findByIdAndDelete(req.params.id);
        if (!reminder) {
            return res.status(404).json({ status: "failed", message: 'Reminder not found' });
        }
        res.json({ status: "success", message: 'Reminder deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};