import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
// import { boolean } from 'joi';

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
      enum: ['user', 'caretaker'],
      required: true
    },
    reminders: [String],
    goals: [String],
    caretaker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Caretaker',
      default: null
    },
    caretaketAssigned: {
      type: Boolean,
      default: false
    },
    habits: [String]
  },
  { timestamps: true }
)

const User = mongoose.model("User", userSchema);

export default User;