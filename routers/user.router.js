const { Router } = require("express");
const { signup, signin } = require("../controllers/user.controller.js");

const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);

module.exports = userRouter;
