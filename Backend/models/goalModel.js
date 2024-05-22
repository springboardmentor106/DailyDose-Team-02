import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    targetDate: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    reminders: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'REMINDER'
    },
    dayFrequency: {
        type: [String],
        enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Daily', 'evenWeeks', 'oddWeeks', 'Monthly', 'Today'],
        required: true
    },
    goalStatus: {
        type: String,
        enum: ['not_started', 'in_progress', 'completed'],
        default: 'not_started'
    }
}, {timestamps: true});

const GOAL = mongoose.model('GOAL', goalSchema);

export default GOAL;