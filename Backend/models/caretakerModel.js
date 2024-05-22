import mongoose from "mongoose";

const caretakerSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      required: true

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
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    gender: {
      type: String,
      lowercase: true,
      enum: ['male', 'female', 'other']
    },
    age: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: ['caretaker'],
      required: true
    },
    phoneNumber: {
      type: Number
    },
    assignedSeniors: [
      {
        type: String
      }
    ]

  },
  { timestamps: true }
);

const Caretaker = mongoose.model("caretaker", caretakerSchema);

export default Caretaker