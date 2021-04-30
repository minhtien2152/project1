import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      ref: "User",
    },
    course_id: {
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

export default Comment;
