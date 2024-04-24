const mongoose = require('mongoose');

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
    }
});

const GOAL = mongoose.model('GOAL', goalSchema);

export default GOAL;