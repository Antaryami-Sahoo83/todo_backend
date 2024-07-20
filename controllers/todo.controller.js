
import Todo from "../models/todo.model.js";

// Create a new todo
export const createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      ...req.body,
      userId: req.user.id,
    });
    const result = await todo.save();
    res.status(201).send({
      status: "success",
      message: "Todo created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Todo creation failed",
      error: error.message,
    });
  }
};

// Get todos of authenticated user
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.status(200).send({
      status: "success",
      message: "Todos retrieved successfully",
      data: todos,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Failed to retrieve todos",
      error: error.message,
    });
  }
};

// Update a todo
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { title, description, status },
      { new: true }
    );

    if (!updatedTodo) {
      return res
        .status(404)
        .send({ status: "error", message: "Todo not found" });
    }
    res.status(200).send({
      status: "success",
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Todo update failed",
      error: error.message,
    });
  }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!deletedTodo) {
      return res
        .status(404)
        .send({ status: "error", message: "Todo not found" });
    }
    res
      .status(200)
      .send({ status: "success", message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Todo deletion failed",
      error: error.message,
    });
  }
};
