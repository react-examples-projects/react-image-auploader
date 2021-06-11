const { Schema, model } = require("mongoose");
require("./Image");
require("./User");

const CommentSchema = new Schema({
  content: { type: String, required: true, trim: true },
  image_id: { type: Schema.Types.ObjectId, ref: "Image", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = model("Comment", CommentSchema);
