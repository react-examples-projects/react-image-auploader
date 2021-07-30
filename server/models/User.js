const { Schema, model } = require("mongoose");
const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  perfil_photo: { type: String, default: "" },
  name: { type: String, required: true, trim: true },
  favoritesImages: [
    {
      // it will be a reference to user collection
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = model("User", UserSchema);
