const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const userSchema = new Schema({
      username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
      },
      role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
      },
      email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
      },
      password: {
            type: String,
            required: true,
            trim: true,
      },
});

userSchema.pre("save", async function (next) {
      if (this.isModified("password")) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
      }
      next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
