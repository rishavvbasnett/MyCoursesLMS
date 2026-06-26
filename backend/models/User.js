import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  courses: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

userSchema.set("toJSON", {
  transform: (document, documentObject) => {
    documentObject.id = documentObject._id.toString();
    delete documentObject._id;
    delete documentObject.__v;
    delete documentObject.passwordHash;
  },
});

const User = mongoose.Model("User", userSchema);

export default User;
