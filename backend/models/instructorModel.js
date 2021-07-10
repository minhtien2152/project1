const mongoose = require("mongoose");

const instructorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  avatar: { type: { type: String }, value: { type: String } },
  description: {
    type: String,
  },
  page: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Page",
  },
});

const Instructor = mongoose.model("Instructor", instructorSchema);

module.exports = Instructor;
