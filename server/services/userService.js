const { hashPassword } = require("../helpers/utils");
class UserController {
  constructor() {
    this.UserModel = require("../models/User");
    this.optionsUpdate = { new: true };
  }

  async createUser(payload) {
    const user = new this.UserModel(payload);
    return new Promise((resolve, reject) => {
      user.save((err, result) => {
        if (err) return reject(err);
        delete result.password;
        resolve(result);
      });
    });
  }

  async existsUser(email) {
    const user = await this.UserModel.findOne({ email }).lean();
    return user;
  }

  async isEmailInUse(email) {
    const users = await this.UserModel.find({ email }).lean();
    return users.length > 0;
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
      { password: hashPassword(password) },
      this.optionsUpdate
    ).lean();
    delete userUpdated.password;
    return userUpdated;
  }

  async deleteFavorite({ idImage, idUser }) {
    const user = await this.UserModel.findById(idUser);
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
