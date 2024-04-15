import { Schema, model } from "mongoose";

const seniorSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'USER',
        required: true
    },
    medications: [{
        type: Schema.Types.ObjectId,
        ref: 'MEDICINE',
    }]
}, { timestamps: true })

const SENIOR = model('SENIOR', seniorSchema)
export default SENIOR;