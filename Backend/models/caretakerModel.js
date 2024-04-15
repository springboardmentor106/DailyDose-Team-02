import { Schema, model } from "mongoose";

const CaretakerSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'USER',
        required: true
    },
    seniors: [{
        type: Schema.Types.ObjectId,
        ref: 'SENIOR',
    }]
}, { timestamps: true });

const CARETAKER = model('CARETAKER', CaretakerSchema);

export default CARETAKER;