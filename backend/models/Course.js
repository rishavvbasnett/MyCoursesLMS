import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  teachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

courseSchema.set("toJSON", {
  transform: (document, documentObject) => {
    documentObject.id = documentObject._id;
    delete documentObject._id;
    delete documentObject.__v;
  },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
