const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
      title: {
            type: String,
            required: true,
      },
      description: {
            type: String,
            required: true,
      },
      status: {
            type: String,
            enum: ["pending", "completed"],
            default: "pending",
      },
      userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
      },
      createdAt: {
            type: Date,
            default: Date.now,
      },
      updatedAt: {
            type: Date,
            default: Date.now,
      },
});

module.exports = mongoose.model("Todo", todoSchema);
