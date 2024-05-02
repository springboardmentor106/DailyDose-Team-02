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
    targetDate: Date,
    completed: {
        type: Boolean,
        default: false
    },
    remiders: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'REMINDER'
    },
    dayFrequency: {
        type: [String],
        enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Daily', 'evenWeeks', 'oddWeeks', 'Monthly']
    }
});

const GOAL = mongoose.model('GOAL', goalSchema);

export default GOAL;