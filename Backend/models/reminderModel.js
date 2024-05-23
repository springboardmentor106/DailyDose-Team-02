import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const reminderSchema = new mongoose.Schema({
    uuid: {
        type: String,
        default: uuidv4,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    dayFrequency: {
        type: [String],
        enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Daily', 'evenWeeks', 'oddWeeks', 'Monthly', 'Today'],
        default: []
    },
    frequencyPerDay: {
        type: Number,
        default: 1
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    pushNotification: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: String
    },
}, { timestamps: true })

const REMINDER = mongoose.model('REMINDER', reminderSchema);

export default REMINDER;