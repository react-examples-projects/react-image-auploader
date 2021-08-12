const { Schema, model } = require("mongoose");
const CommentSchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    maxLength: [500, "Máximo 500 carácteres para los comentarios"],
  },
  image_id: { type: Schema.Types.ObjectId, ref: "Image", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = model("Comment", CommentSchema);
