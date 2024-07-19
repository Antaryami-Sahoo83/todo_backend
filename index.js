import express from 'express';
import todoRouter from "./routers/todo.router.js";
import userRouter from "./routers/user.router.js";
import bodyParser from "body-parser";
import dbConnect from './db/db.config.js';
import dotenv from "dotenv";


dotenv.config();

const app = express();


app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/todos", todoRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
      res.send("<h1>Todo Application</h1>");
});


dbConnect();

app.listen(3000, (err) => {
      if(err){
            console.log(err);
      }
      console.log("Server is running http://localhost:3000");
});
