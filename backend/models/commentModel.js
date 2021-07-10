const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
    },
    course: {
      type: String,
      ref: "Course",
    },
    content: { type: String },
    rating: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
