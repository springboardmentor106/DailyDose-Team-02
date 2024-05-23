import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
    title: {
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
    }
}, { timestamps: true });

const GOAL = mongoose.model('GOAL', goalSchema);

export default GOAL;