const { Schema, model } = require("mongoose");
const ImageSchema = new Schema({
  url_image: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, trim: true },
  tags: { type: [String], default: [] },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
  ],
});

ImageSchema.pre("save", function (next) {
  if (this.title.trim() === "") {
    this.title = "Sin título";
  }
  next();
});

module.exports = model("Image", ImageSchema);
