import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const goalSchema = new mongoose.Schema({
    uuid: {
        type: String,
        default: uuidv4,
        unique: true
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
        enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Daily',  'Today'],
        default: ['Daily']
    },
    endDate: {
        type: Date
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedToday: {
        type: Boolean,
        default: false
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
    lastUpdated: {
        type: Date,
        default: new Date()
    }
}, { timestamps: true });

const GOAL = mongoose.model('GOAL', goalSchema);

export default GOAL;
