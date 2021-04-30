import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    },
    url: { type: String },
    price: { type: Number },
    duration: { type: String },
    sale_detail: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
