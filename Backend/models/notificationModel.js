import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const notificationDetailSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(), // Automatically generate ObjectId
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    belongTo: {
        type: String,
        required: true
    },
    actionTaken: {
        type: Boolean,
        default: false
    }
});

const notificationSchema = mongoose.Schema({
    uuid: {
        type: String,
        default: uuidv4
    },
    userId: {
        type: String,
        required: true
    },
    notification: {
        type: [notificationDetailSchema],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Notification", notificationSchema);
