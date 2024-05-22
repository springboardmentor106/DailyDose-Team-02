import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      default: uuidv4,
      unique: true
    },
    firstname: {
      type: String,
      required: true,
      trim: true
    },
    lastname: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      lowercase: true
    },
    age: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: ['user'],
      required: true
    },
    phoneNumber: {
      type: Number
    },
    reminders: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reminder'
    }],
    goals: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Goal'
    }],
    habits: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HABIT'
    }],
    caretaker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Caretaker',
      default: null
    },
    caretaketAssigned: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

const User = mongoose.model("User", userSchema);


export default User;