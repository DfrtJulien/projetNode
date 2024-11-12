const mongoose = require("mongoose");

const Shema = mongoose.Schema;
const PostSchema = new Schema({
  title: {
    type: string,
    required: true,
  },
  body: {
    type: string,
    requried: true,
  },
  createAt: {
    deflaut: Date.now(),
  },
  updatedAt: {
    deflaut: Date.now(),
  },
});

module.exports = mongoose.model("Post", PostSchema);
