const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
  name: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
  post_id: { type: Shema.Types.ObjectId, required: true },
});

module.exports = model("Comment", CommentSchema);
