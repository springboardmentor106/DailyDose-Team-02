import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const reminderSchema = new mongoose.Schema({
    uuid: {
        type: String,
        default: uuidv4,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    dayFrequency: {
        type: [String],
        enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Daily', 'evenWeeks', 'oddWeeks', 'Monthly', 'Today'],
        default: []
    },
    endDate: {
        type: Date
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedToday: {
        type: Boolean,
        default: false
    },
    timeFrequency: {
        type: Number,
        default: 1
    },
    pushNotification: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: String,
        // enum: ['user', 'caretaker'],
    },
    createdById: {
        type: String,
    },
    completedDays: {
        type: [Date],
        default: []
    },
    skippedDays: {
        type: [Date],
        default: []
    },
    lastSentNotification: {
        type: Date,
        default: new Date(new Date().getTime() - (24 * 60 * 60 * 1000))
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

const REMINDER = mongoose.model('REMINDER', reminderSchema);

export default REMINDER;