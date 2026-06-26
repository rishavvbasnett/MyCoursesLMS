import express from "express";
import cors from "cors";
import loginRouter from "./controllers/LoginRouter.js";
import { errorHandler, unknownEndpoint } from "./utils/middleware.js";
import userRouter from "./controllers/UserRouter.js";

const App = express();

App.use(express.json());
App.use(cors());

App.use("/api/login", loginRouter);
App.use("/api/users", userRouter);

App.use(unknownEndpoint);
App.use(errorHandler);

export default App;
