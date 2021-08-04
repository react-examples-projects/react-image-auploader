const { Schema, model } = require("mongoose");
const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "El e-mail es obligatorio"],
    unique: true,
    trim: true,
  },
  password: { type: String, required: [true, "La contraseña es obligatoria"] },
  isAdmin: { type: Boolean, default: false },
  perfil_photo: { type: String, default: "" },
  name: {
    type: String,
    required: [true, "El nombre es obligatoria"],
    unique: true,
    trim: true,
  },
  favoritesImages: [
    {
      // it will be a reference to user collection
      type: Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
});

module.exports = model("User", UserSchema);
