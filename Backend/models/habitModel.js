import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const habitSchema = mongoose.Schema({
    uuid: {
        type: String,
        default: uuidv4,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdBy: {
        type: String
    }
},
    { timestamps: true });

const HABIT = mongoose.model('HABIT', habitSchema)

export default HABIT