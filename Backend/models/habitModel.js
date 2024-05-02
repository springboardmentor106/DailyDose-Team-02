import mongoose from "mongoose";

const habitSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String
    }
})

const HABIT = mongoose.model('HABIT', habitSchema)
export default HABIT