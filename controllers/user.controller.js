import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
      try {
            const { username, email, password } = req.body;
            let user = await User.findOne({ email });
            if (user) {
                  return res.status(400).json({ message: "Email already exists!" });
            }

            user = await User.findOne({ username });
            if (user) {
                  return res.status(400).json({ message: "Username already exists!" });
            }

            const newUser = new User({
                  username,
                  email,
                  password
            });

            const createdUser = await newUser.save();
            res.status(201).json({ message: "User successfully registered!", user: createdUser });
      } catch (error) {
            console.error("Signup Error:", error);
            res.status(500).json({ message: "Internal server error" });
      }
};

export const signin = async (req, res) => {
      try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                  return res.status(401).json({ message: "Invalid email" });
            }

            
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                  return res.status(401).json({ message: "Invalid password" });
            }

            const token = jwt.sign({
                        user: { id: user._id, username: user.username, email: user.email, },
                  }, process.env.JWT_SECRET,
                  { expiresIn: "6h", }
            );

            res.status(200).json({ message: "Successfully logged in!", token });
      } catch (error) {
            console.error("Signin Error:", error);
            res.status(500).json({ message: "Internal server error" });
      }
};
