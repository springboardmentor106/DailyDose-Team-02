import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import caretakerRoutes from './routes/caretakerRoutes.js';
import goalRoutes from './routes/goalRoutes.js';
import reminderRoutes from './routes/reminderRoutes.js';
import habitRoutes from './routes/habitRoutes.js';
import notificationRoutes from "./routes/notificationRoutes.js"

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use('/api/caretaker', caretakerRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/habits', habitRoutes)
app.use('/api/notifications', notificationRoutes)

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Connect to MongoDB
mongoose.connect(process.env.MongoDBURL)
  .then(() => {
    console.log('App connected to the database');
    app.listen(process.env.Port, () => {
      console.log(`Server is running at port ${process.env.Port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });