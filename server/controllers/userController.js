class UserController {
  constructor() {
    this.UserModel = require("../models/User");
  }

  async existsUser({ email, password }) {
    const user = await this.UserModel.findOne(
      { email, password },
      { password: 0 }
    ).lean();
    return user;
  }

  async getUserById(id) {
    const user = await this.UserModel.findById(id).lean();
    return user;
  }

  async setPerfilPhoto({ id, perfil_photo }) {
    const userUpdated = await this.UserModel.findByIdAndUpdate(id, {
      perfil_photo,
    });
    return userUpdated;
  }

  async changePassword({ id, password }) {
    const userUpdated = await this.UserModel.findByIdAndUpdate(id, {
      password,
    });
    return userUpdated;
  }
}

module.exports = new UserController();
