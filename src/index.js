import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { userRoute } from './routes/users.js';
import { recipeRouter } from './routes/recipes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRoute);
app.use("/recipes", recipeRouter);

mongoose.connect(process.env.MONGODB_STRING);


app.listen(process.env.PORT, () => console.log(`SERVER STARTED AT PORT, ${process.env.PORT}`));