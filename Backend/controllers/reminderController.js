import REMINDER from '../models/reminderModel.js';


export const createReminder = async (req, res) => {
    try {
        const newReminder = new REMINDER(req.body);
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
        const updatedReminder = await REMINDER.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReminder) {
            return res.status(404).json({ status: "failed",message: 'Reminder not found' });
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
            return res.status(404).json({ status: "failed",message: 'Reminder not found' });
        }
        res.json({status: "success", message: 'Reminder deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};