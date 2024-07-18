import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
      title: {
            required: true,
            type: String,
            trim: true,
      },
      description: {
            type: String,
            required: true,
            trim: true,
      },
      status: {
            type: String,
            required: true,
            enum: ["pending", "completed"],
            default: "pending",
      },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
