const { Schema, model } = require("mongoose");
require("./Comment");

const ImageSchema = new Schema({
  url_image: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
  ],
});

module.exports = model("Image", ImageSchema);
