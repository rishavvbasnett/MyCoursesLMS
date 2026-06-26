import {PORT, MONGODB_URI } from "./utils/config.js";
import App from "./App.js";
import mongoose from "mongoose";

mongoose
  .connect(MONGODB_URI, { family: 4 })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) =>
    console.log("Couldn't connect to MongoDB: ", error.message),
  );

App.listen(PORT, () => console.log("App listening on PORT", PORT));
