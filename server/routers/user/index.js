const express = require("express");
const router = express.Router();
const { uploadImages } = require("../../helpers/requests");
const UserController = require("../../controllers/userController");
const { success, error } = require("../../helpers/httpResponses");
const validate = require("../../helpers/validations/validate");
const {
  perfilPhotoSchemaValidation,
  passwordChangeValidation,
} = require("../../helpers/validations/validations");

router.post(
  "/perfil-photo",
  validate(perfilPhotoSchemaValidation),
  async (req, res, next) => {
    try {
      const perfil_photo = req.files.perfil_photo.data;
      const data = await uploadImages(perfil_photo);
      await UserController.setPerfilPhoto({
        id: req.user._id,
        perfil_photo: data.url,
      });
      success(res, data);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/password",
  validate(passwordChangeValidation),
  async (req, res, next) => {
    try {
      const { password, passwordConfirm } = req.body;
      const id = req.user._id;
      if (password !== passwordConfirm) {
        return error(res, "Las contraseñas no coinciden", 400);
      }
      const userUpdated = await UserController.changePassword({ id, password });
      success(res, userUpdated);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/user", async (req, res, next) => {
  try {
    const user = await UserController.getUserById(req.user._id);
    delete user.password;
    success(res, user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
