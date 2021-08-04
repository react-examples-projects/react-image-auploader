const mongoose = require("mongoose");
class UserController {
  constructor() {
    this.UserModel = require("../models/User");
    this.optionsUpdate = { new: true };
  }

  async existsUser({ email, password }) {
    const user = await this.UserModel.findOne(
      { email, password },
      { password: 0 }
    ).lean();
    return user;
  }

  async getUserById(id) {
    const user = await this.UserModel.findById(id, { password: 0 }).lean();
    return user;
  }

  async setPerfilPhoto({ id, perfil_photo }) {
    const userUpdated = await this.UserModel.findByIdAndUpdate(
      id,
      { perfil_photo },
      this.optionsUpdate
    ).lean();
    return userUpdated;
  }

  async changePassword({ id, password }) {
    const userUpdated = await this.UserModel.findByIdAndUpdate(
      id,
      { password },
      this.optionsUpdate
    ).lean();
    delete userUpdated.password;
    return userUpdated;
  }

  async deleteFavorite({ idImage, idUser }) {
    const user = await this.UserModel.findById(idUser).lean();
    if (user?.favoritesImages?.includes(idImage)) {
      await this.UserModel.findByIdAndUpdate(idUser, {
        $pull: {
          favoritesImages: idImage,
        },
      });
    }
    return user;
  }
}

module.exports = new UserController();
