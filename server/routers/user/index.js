const express = require("express");
const router = express.Router();
const { uploadImages } = require("../../helpers/requests");
const { getTokenInfo } = require("../../helpers/utils");
const getUserById = require("../../controllers/getUserById");
const setPerfilPhoto = require("../../controllers/setPerfilPhoto");
const { success } = require("../../helpers/httpResponses");

router.post("/perfil-photo", async (req, res) => {
  const id = req.body.id;
  const perfil_photo = req.files.perfil_photo.data;
  const data = await uploadImages(perfil_photo);
  await setPerfilPhoto({ id, perfil_photo: data.url });
  success(res, data);
});

router.get("/user", async (req, res) => {
  const user = getTokenInfo(req.token).payload;
  const userFromDb = await getUserById(user._id);
  success(res, userFromDb);
});

module.exports = router;
