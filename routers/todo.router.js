import express from "express";
import {
      createTodo,
      getTodos,
      updateTodo,
      deleteTodo,
} from "../controllers/todo.controller.js";
import authMiddleware from "../middleware/user.middleware.js";
import roleAuthorization from "../middleware/roleAuthorization.js";

authMiddleware

const router = express.Router();

router.get("/", authMiddleware, roleAuthorization(["user", "admin"]), getTodos);
router.post("/", authMiddleware, roleAuthorization(["user", "admin"]), createTodo);
router.put("/:id", authMiddleware, roleAuthorization(["user", "admin"]), updateTodo);
router.delete("/:id", authMiddleware, roleAuthorization(["admin"]), deleteTodo);

export default router;


