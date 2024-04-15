import { Schema, model } from "mongoose";

const notificationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    smsNotification: {
        type: Boolean,
        default: true
    },
    emailNotification: {
        type: Boolean,
        default: true
    },
    pushNotification: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const NOTIFICATION = model('NOTIFICATION', notificationSchema);

export default NOTIFICATION;