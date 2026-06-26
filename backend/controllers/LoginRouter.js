import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../utils/config.js";
import { IncorrectPasswordError } from "../utils/errors.js";

const loginRouter = express.Router();

loginRouter.post("/", async (request, response, next) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      throw new IncorrectPasswordError("Email and password is required");
    }
    const foundUser = await User.findOne({
      email,
    });
    if (!foundUser) {
      throw new IncorrectPasswordError("User doesn't exist");
    }
    const correctPassword =
      (await bcrypt.compare(password, foundUser.passwordHash)) || false;
    if (!correctPassword) {
      throw new IncorrectPasswordError("Incorrect email or password");
    }
    const userInfoForToken = {
      id: foundUser.id,
      email: foundUser.email,
    };

    const token = jwt.sign(userInfoForToken, SECRET);
    return response.json(token, foundUser.name);
  } catch (error) {
    next(error);
  }
});

export default loginRouter;
