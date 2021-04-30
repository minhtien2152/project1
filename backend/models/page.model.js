import mongoose from "mongoose";

const pageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  script_file: { type: String },
});

const Page = mongoose.model("Page", pageSchema);

export default Page;
