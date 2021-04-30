import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
});

const Course = mongoose.model("Course", categorySchema);

export default Course;
