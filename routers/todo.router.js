const express = require("express");
const {
      createTodo,
      getTodos,
      updateTodo,
      deleteTodo,
} = require("../controllers/todo.controller.js");
const authMiddleware = require("../middleware/user.middleware.js");
const roleAuthorization = require("../middleware/roleAuthorization.js");

const todoRouter = express.Router();

todoRouter.get("/", authMiddleware, roleAuthorization(["user", "admin"]), getTodos);
todoRouter.post("/", authMiddleware, roleAuthorization(["user", "admin"]), createTodo);
todoRouter.put("/:id", authMiddleware, roleAuthorization(["user", "admin"]), updateTodo);
todoRouter.delete("/:id", authMiddleware, roleAuthorization(["admin"]), deleteTodo);

module.exports = todoRouter;
