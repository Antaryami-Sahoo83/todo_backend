import express from "express";
import {
      createTodo,
      getTodos,
      updateTodo,
      deleteTodo,
} from "../controllers/todo.controller.js";
import authMiddleware from "../middleware/user.middleware.js";
import roleAuthorization from "../middleware/roleAuthorization.js";

const todoRouter = express.Router();

todoRouter.get("/", authMiddleware, roleAuthorization(["user", "admin"]), getTodos);
todoRouter.post("/", authMiddleware, roleAuthorization(["user", "admin"]), createTodo);
todoRouter.put("/:id", authMiddleware, roleAuthorization(["user", "admin"]), updateTodo);
todoRouter.delete("/:id", authMiddleware, roleAuthorization(["admin"]), deleteTodo);

export default todoRouter;
