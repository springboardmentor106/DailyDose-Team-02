import { Schema, model } from "mongoose";

const medicationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dosage: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    frequency: {
        type: [String],
        required: true,
        enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Daily', 'evenWeeks', 'oddWeeks', 'Monthly']
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date
    },
    notifications: [{
        type: Schema.Types.ObjectId,
        ref: 'NOTIFICATION',
    }]

}, { timestamps: true })

const MEDICINE = model('MEDICINE', medicationSchema)

export default MEDICINE;