import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import user from './routes/user.js';

dotenv.config()

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Server running');
});

app.use('/user', user)


mongoose
  .connect(process.env.mongoDBURL)
  .then(() => {
    console.log('App connected to the database');
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Database connection error. \n${error}`);
  });