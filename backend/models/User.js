import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: { type: String, required: [true, "email is required"], unique: true },
  name: {
    type: String,
    required: [true, "name is required"],
    minlength: [3, "name must be at least 3 characters long"],
  },
  role: {
    type: String,
    required: true,
    required: [true, "role is required"],
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
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

const User = mongoose.model("User", userSchema);

export default User;
