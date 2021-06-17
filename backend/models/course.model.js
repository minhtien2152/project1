const mongoose = require ("mongoose");

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
      url :{type: String},
      type:{type: String,
        enum: ["img", "video"],
        default: "img"}
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
courseSchema.index({ title: 1})
const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
