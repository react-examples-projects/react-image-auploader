const UserModel = require("../models/User");

async function getUserById(id) {
  const user = await UserModel.findById(id).lean();
  return user;
}

module.exports = getUserById;
