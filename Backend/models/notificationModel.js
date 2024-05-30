import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const notificationDetailSchema = new mongoose.Schema({
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
}, { timestamps: true });
const notificationSchema = new mongoose.Schema({
    uuid: {
        type: String,
        default: uuidv4
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true
    },
    caretakerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model for caretakers
        default: null
    },
    notification: {
        type: [notificationDetailSchema],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }); 

export default mongoose.model("Notification", notificationSchema);