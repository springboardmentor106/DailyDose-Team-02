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
    description: {
        type: String,
        required: true
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
    completedToday: {
        type: Boolean,
        default: false
    },
    goalStatus: {
        type: String,
        enum: ['not_started', 'in_progress', 'completed'],
        default: 'not_started'
    },
    createdBy: {
        type: [String],
    },
    createdForSenior: {
        type: String,
    },
    reminders: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'REMINDER',
        unique: true
    },
    dayFrequency: {
        type: [String],
        enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
            'Saturday', 'Daily', 'evenWeeks', 'oddWeeks', 'Monthly', 'Today'],
        required: true
    },
}, { timestamps: true });

const GOAL = mongoose.model('GOAL', goalSchema);

export default GOAL;