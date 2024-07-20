import express from 'express';
import todoRouter from "./routers/todo.router.js";
import userRouter from "./routers/user.router.js";
import bodyParser from "body-parser";
import dbConnect from './db/db.config.js';
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/todos", todoRouter);
app.use("/user", userRouter);

const swaggerDocument = YAML.load("./docs/swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

dbConnect();

app.get("/", (req, res) => {
      res.send("<h1>Todo Application</h1>");
});



app.listen(3000, (err) => {
      if (err) {
            console.log(err);
      }
      console.log("Server is running http://localhost:3000");
});
