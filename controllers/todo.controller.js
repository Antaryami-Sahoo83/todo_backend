const Todo = require("../models/todo.model.js");

const createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      ...req.body,
      userId: req.user.id,
    });
    const result = await todo.save();
    res.status(201).send({ status: "success", message: "Todo created successfully", data: result, });
  } catch (error) {
    res.status(500).send({ status: "error", message: "Todo creation failed", error: error.message, });
  }
};

// Get todos of authenticated user or all todos if admin
const getTodos = async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { userId: req.user.id };
    const todos = await Todo.find(filter);
    res.status(200).send({ status: "success", message: "Todos retrieved successfully", data: todos });
  } catch (error) {
    res.status(500).send({ status: "error", message: "Failed to retrieve todos", error: error.message });
  }
};

// Update a todo
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const filter =
      req.user.role === "admin"
        ? { _id: id }
        : { _id: id, userId: req.user.id };
    const updatedTodo = await Todo.findOneAndUpdate(
      filter,
      { title, description, status },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).send({ status: "error", message: "Todo not found" });
    }
    res.status(200).send({ status: "success", message: "Todo updated successfully", data: updatedTodo });
  } catch (error) {
    res.status(500).send({ status: "error", message: "Todo update failed", error: error.message });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const filter = req.user.role === "admin" ? { _id: id } : { _id: id, userId: req.user.id };
    const deletedTodo = await Todo.findOneAndDelete(filter);

    if (!deletedTodo) {
      return res.status(404).send({ status: "error", message: "Todo not found" });
    }
    res.status(200).send({ status: "success", message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).send({ status: "error", message: "Todo deletion failed", error: error.message, });
  }
};

module.exports = { createTodo, getTodos, updateTodo, deleteTodo };
