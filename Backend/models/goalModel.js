import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    targetDate: Date,
    completed: {
        type: Boolean,
        default: false
    },
    remiders: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'REMINDER'
    }
});

const Goal = mongoose.model('Goal', goalSchema);

export default Goal;