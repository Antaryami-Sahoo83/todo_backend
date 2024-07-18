import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";

import todoRouter from "./routers/todo.js";


dotenv.config();

const app = express();

app.use(express.json());

app.use("/", todoRouter);



const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

async function startServer() {
      try {
            await mongoose.connect(
                  `mongodb+srv://${USERNAME}:${PASSWORD}@sibu.xje0et5.mongodb.net/todolist?retryWrites=true&w=majority&appName=sibu`
            );
            console.log("Connected to MongoDB");

            app.listen(3000, (err) => {
                  if (err) {
                        console.log(err);
                  }
                  console.log("Server is running on port 3000");
            });
      } catch (err) {
            console.error("Error connecting to MongoDB", err);
      }
}


startServer();


