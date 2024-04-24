import mongoose from "mongoose";

const caretakerSchema = new mongoose.Schema(
    {
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

    },
    { timestamps: true }
  );



const Caretaker = mongoose.model("caretaker", caretakerSchema);

 
export default Caretaker