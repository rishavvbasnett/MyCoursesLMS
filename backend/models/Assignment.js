import mongoose from "mongoose";

const assignmentSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  submissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

assignmentSchema.set("toJSON", {
  transform: (document, documentObject) => {
    documentObject.id = documentObject._id;
    delete documentObject._id;
    delete documentObject.__v;
  },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
