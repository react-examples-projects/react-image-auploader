const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const existsToken = require("../../middlewares/existsToken");
const { SECRET_TOKEN } = require("../../config/variables").SERVER.API;
const UserController = require("../../controllers/userController");
const { unauthorized, success } = require("../../helpers/httpResponses");
const validate = require("../../helpers/validations/validate");
const {
  loginSchemaValidation,
} = require("../../helpers/validations/validations");

router.post(
  "/login",
  validate(loginSchemaValidation),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await UserController.existsUser({ email, password });
      if (user) {
        const token = jwt.sign({ ...user }, SECRET_TOKEN, { expiresIn: "12h" });
        return success(res, { user, token });
      }
      unauthorized(res, "Usuario o clave incorrecta");
    } catch (err) {
      next(err);
    }
  }
);

router.get("/verify-token", existsToken, (req, res, next) => {
  try {
    success(res, { token: req.token });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
