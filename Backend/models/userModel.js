import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Trim whitespace
        validate: {
            validator: function(value) {
                // Checking values using RegExp to match email format
                const emailRegEx = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
                return emailRegEx.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    passwordHash: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                const phoneNumberRegEx = /^[0-9]{10}$/
                return phoneNumberRegEx.test(value);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        lowercase: true,
        enum: ['male', 'female', 'other']
    },
    userRole: {
        type: String,
        required: true,
        lowercase: true,
        enum: ['senior', 'caretaker']
    }
}, { timestamps: true });

const USER = model('USER', userSchema);

export default USER;
