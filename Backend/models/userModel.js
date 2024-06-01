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
      enum: ['user', 'caretaker'],
      required: true
    },
    reminders: {
      type: [String],
      default: []
    },
    goals: {
      type: [String],
      default: []
    },
    caretaker: {
      type: String,
      default: null
    },
    caretaketAssigned: {
      type: Boolean,
      default: false
    },
    goalProgress: {
      type: String,
      default: 0
    },
    hitProgressNotificationLastSent: {
      type: Date,
      default: () => new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    dailyQuoteSent: {
      type: Date,
      default: () => new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    habits: {
      type: [String],
      default: []
    },
    allergies: {
      type: [String],
      default: []
    },
    diseases: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
)

const User = mongoose.model("User", userSchema);
export default User;