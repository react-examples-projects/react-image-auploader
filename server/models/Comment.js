const { Schema, model } = require("mongoose");
require("./Image");

const CommentSchema = new Schema({
  name: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
  image_id: { type: Schema.Types.ObjectId, ref: "Image", required: true },
});

module.exports = model("Comment", CommentSchema);
