const { Schema, model } = require("mongoose");

const ImageSchema = new Schema({
  url_image: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
});

module.exports = model("Image", ImageSchema);
