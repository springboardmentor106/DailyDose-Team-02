import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: [Date],
    },
    dayFrequency: {
        type: [String],
        enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Daily', 'evenWeeks', 'oddWeeks', 'Monthly']
    },
    compleated: {
        type: Boolean,
        default: false
    },
    timeFrequency: {
        type: Number,
        default: 1
    },
    createdBy: {
        type: String,
        enum: ['user', 'caretaker']
    },
    smsNotification: {
        type: Boolean,
        default: false
    },
    emailNotification: {
        type: Boolean,
        default: false
    },
    pushNotification: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Reminder = mongoose.model('Reminder', reminderSchema);

export default Reminder;