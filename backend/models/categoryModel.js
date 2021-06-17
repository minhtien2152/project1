const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
