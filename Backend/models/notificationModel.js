import mongoose from "mongoose";

// Schema for pill reminders
const pillReminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pillName: {
    type: String,
    required: true
  },
  dosage: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  reminders: [{ 
    type: String,
    required: true
  }]
},  { timestamps: true },
);

// Schema for user goals
const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  goal: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
},  { timestamps: true },
);

// Schema for caretaker-user relationships
const caretakerUserSchema = new mongoose.Schema({
    caretakerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Caretaker',
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
},  { timestamps: true },
);

  
const PillReminder = mongoose.model("PillReminder", pillReminderSchema);
const Goal = mongoose.model("Goal", goalSchema);
const CaretakerUser = mongoose.model("CaretakerUser", caretakerUserSchema);

export default { PillReminder, Goal ,CaretakerUser };
