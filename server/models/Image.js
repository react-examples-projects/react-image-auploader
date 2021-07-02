const { Schema, model } = require("mongoose");
require("./Comment");

const ImageSchema = new Schema({
  url_image: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  title: { type: String, trim: true },
  tags: { type: Array, default: [] },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
  ],
});

module.exports = model("Image", ImageSchema);
