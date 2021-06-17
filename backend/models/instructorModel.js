const mongoose = require("mongoose")

const instructorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  avatar:{
    type: String,
  },
  description: {
    type: String,
  },
  page_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Page",
  },
});

const Instructor = mongoose.model("Instructor", instructorSchema);

module.exports =  Instructor;
