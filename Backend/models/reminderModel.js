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
        type: Date,
    },
    timeFrequency: {
        type: [Date]
    },
    dayFrequency: {
        type: [String],
        enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Daily', 'evenWeeks', 'oddWeeks', 'Monthly']
    },
    compleated: {
        type: Boolean,
        default: false
    },
    smsNotification: {
        type: Boolean,
        default: false
    },
    emailNotification: {
        type: Boolean,
        default: false
    },
    pushNotification: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const REMINDER = mongoose.model('REMINDER', reminderSchema);

export default REMINDER;