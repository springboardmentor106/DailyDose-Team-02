import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import connectToMongoDB from './config/connectdb.js'
import userRoutes from './routes/userRoutes.js'
import caretakerRoutes from './routes/caretakerRoutes.js'


const app = express()
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL


// CORS Policy
app.use(cors())


// Database Connection
connectToMongoDB(process.env.MONGODB ?? "mongodb://localhost:27017/DailyDose").then(() =>
  console.log("Mongodb connected")
);

// JSON
app.use(express.json())

// Routes Load
app.use("/api/user", userRoutes);

app.use('/api/caretaker', caretakerRoutes);



app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
