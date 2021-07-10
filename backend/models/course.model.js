const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    title: {
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
    media: {
      value: { type: String },
      type: {
        type: String,
        enum: ["img_cdn", "img_link", "video_link"],
        default: "img_link",
      },
    },
    url: { type: String },
    price: { type: Number },
    duration: { type: String },
    sale_detail: { type: Number },
    category: { type: String, ref: "Category" },
    page: { type: String, ref: "Page" },
    instructor: { type: String, ref: "Instructor" },
    thumbnail: {
      type: {
        type: String,
        enum: ["link", "cdn"],
        default: "link",
      },
      value: { type: String },
    },
    knowledge: { type: String },
    currency: { type: String },
  },
  {
    timestamps: true,
  }
);
courseSchema.index({ title: "text" });
const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
