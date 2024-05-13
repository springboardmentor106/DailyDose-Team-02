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
    completed: {
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
    pushNotification: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

const REMINDER = mongoose.model('REMINDER', reminderSchema);

export default REMINDER;