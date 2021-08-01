const express = require("express");
const router = express.Router();
const { uploadImages } = require("../../helpers/requests");
const { getTokenInfo } = require("../../helpers/utils");
const UserController = require("../../controllers/userController");
const { success, error } = require("../../helpers/httpResponses");

router.post("/perfil-photo", async (req, res) => {
  try {
    const id = req.body.id;
    const perfil_photo = req.files.perfil_photo.data;
    const data = await uploadImages(perfil_photo);
    await UserController.setPerfilPhoto({ id, perfil_photo: data.url });
    success(res, data);
  } catch (error) {
    next(err);
  }
});

router.patch("/password", async (req, res, next) => {
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
});

router.get("/user", async (req, res, next) => {
  try {
    const user = getTokenInfo(req.token).payload;
    const userFromDb = await UserController.getUserById(user._id);
    success(res, userFromDb);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
