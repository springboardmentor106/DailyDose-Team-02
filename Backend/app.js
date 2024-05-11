import dotenv from 'dotenv'

dotenv.config()

import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import caretakerRoutes from './routes/caretakerRoutes.js'
import mongoose from 'mongoose'

const app = express()

// CORS Policy
app.use(cors())

// JSON
app.use(express.json())

// app.set('view engine', 'ejs');

// Routes Load
app.use("/api/user", userRoutes);

app.use('/api/caretaker', caretakerRoutes);

mongoose
  .connect(process.env.MongoDBURL)
  .then(() => {
    console.log('App connected to the database');
    app.listen(process.env.Port, () => {
      console.log(`Server is running at port ${process.env.Port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });