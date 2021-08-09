const jwt = require("jsonwebtoken");
const { SECRET_TOKEN } = require("../config/variables").SERVER.API;
const UserService = require("../services/userService");
const { unauthorized, success } = require("../helpers/httpResponses");

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await UserService.existsUser({ email, password });
      if (user) {
        const token = jwt.sign({ ...user }, SECRET_TOKEN, { expiresIn: "12h" });
        return success(res, { user, token });
      }
      unauthorized(res, "Usuario o clave incorrecta");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
