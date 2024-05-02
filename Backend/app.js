import dotenv from 'dotenv'
dotenv.config()


import express from 'express'
import cors from 'cors'
import connectToMongoDB from './config/connectdb.js'
import userRoutes from './routes/user.routes.js'
import caretakerRoutes from './routes/caretaker.routes.js'
import mongoose from 'mongoose'


const app = express()
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL


// CORS Policy
app.use(cors())


// JSON
app.use(express.json())

app.set('view engine', 'ejs');

// Routes Load
app.use("/api/user", userRoutes);

      app.use('/api/caretaker', caretakerRoutes);
    })
    .catch(error => {
      console.error("Error connecting to database:", error);
    });
}


connectDatabase()


app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));