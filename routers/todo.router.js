import express from "express";
import {
      createTodo,
      getTodos,
      updateTodo,
      deleteTodo,
} from "../controllers/todo.controller.js";
import authMiddleware from "../middleware/user.middleware.js";

authMiddleware

const router = express.Router();

router.get("/", authMiddleware, getTodos);
router.post("/", authMiddleware, createTodo);
router.put("/:id", authMiddleware, updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);

export default router;


