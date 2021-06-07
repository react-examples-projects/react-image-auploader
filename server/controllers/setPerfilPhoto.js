const UserModel = require("../models/User");

async function setPerfilPhoto({ id, perfil_photo }) {
  const userUpdated = await UserModel.findByIdAndUpdate(id, { perfil_photo });
  return userUpdated;
}

module.exports = setPerfilPhoto;
