const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/todo-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
});

const Todo = mongoose.model("Todo", todoSchema);

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.send(todos);
});

app.post("/todos", async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
  });
  await todo.save();
  res.send(todo);
});

app.put("/todos/:id", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(todo);
});

app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.send({ message: "Todo deleted" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
