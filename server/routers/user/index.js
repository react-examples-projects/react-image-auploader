const express = require("express");
const router = express.Router();
const { uploadImages } = require("../../helpers/requests");
const { getTokenInfo } = require("../../helpers/utils");
const UserController = require("../../controllers/userController")
const { success } = require("../../helpers/httpResponses");

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
