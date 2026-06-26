import express, { request, response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const userRouter = express.Router();

userRouter.post("/", async (request, response, next) => {
  try {
    const { email, name, password, role } = request.body;
    if (password.length < 3) {
      return response.status(400).json({
        error: "password must be atleast 3 characters long",
      });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const userDocument = new User({ email, name, passwordHash, role });
    const savedUser = await userDocument.save();
    return response.json(savedUser);
  } catch (error) {
    next(error);
  }
});

userRouter.patch("/:id", async (request, response, next) => {
  try {
    const { email, name, password } = request.body;
    if (password.length < 3) {
      return response.status(400).json({
        error: "password must be atleast 3 characters long",
      });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const userInfo = { email, name, passwordHash };
    const updatedUser = await User.findByIdAndUpdate(
      request.params.id,
      userInfo,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );
    if (!updatedUser) {
      response.status(400).json({
        error: "user not found",
      });
    }
    return response.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

userRouter.delete("/:id", async (request, response, next) => {
  const deletedUser = await User.findByIdAndDelete(request.params.id);
  if (!deletedUser) {
    return response.status(200).json({
      message: "user not found",
    });
  }
  return response.json(deletedUser);
});

export default userRouter;
