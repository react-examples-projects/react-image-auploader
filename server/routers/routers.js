const express = require("express");
const router = express.Router();
const { API_UPLOAD_IMAGES, API_UPLOAD_IMAGES_KEY, SECRET_TOKEN } =
  require("../config/variables").SERVER.API;

const jwt = require("jsonwebtoken");
const axios = require("axios").default;
const insertImage = require("../controllers/insertImage");
const getImages = require("../controllers/getImages");
const existsUser = require("../controllers/existsUser");
const setPerfilPhoto = require("../controllers/setPerfilPhoto");
const FormData = require("form-data");
const existsToken = require("../middlewares/existsToken");
const getUserById = require("../controllers/getUserById");
const { unauthorized, success } = require("../helpers/httpResponses");
const { getTokenInfo } = require("../helpers/utils");

async function uploadImages(image) {
  const data = new FormData();
  const dataImage = Buffer.from(image).toString("base64");
  data.append("key", API_UPLOAD_IMAGES_KEY);
  data.append("image", dataImage);
  try {
    const res = await axios.post(API_UPLOAD_IMAGES, data, {
      headers: data.getHeaders(),
    });
    return res.data.data;
  } catch (error) {
    console.log(error.response);
  }

  return null;
}

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await existsUser({ email, password });
  if (user) {
    const token = jwt.sign({ ...user }, SECRET_TOKEN);
    return success(res, { user, token });
  }
  unauthorized(res, "Usuario o clave incorrecta");
});

router.get("/images", existsToken, async (req, res) => {
  const data = await getImages();
  success(res, data);
});

router.post("/upload", existsToken, async (req, res) => {
  const data = await uploadImages(req.files.images.data);
  insertImage({ url_image: data.url, name: req.body.name });
  success(res, data);
});

router.post("/perfil-photo", existsToken, async (req, res) => {
  const id = req.body.id;
  const perfil_photo = req.files.perfil_photo.data;
  const data = await uploadImages(perfil_photo);
  await setPerfilPhoto({ id, perfil_photo: data.url });
  success(res, data);
});

router.get("/verify-token", existsToken, (req, res) => {
  success(res, { token: req.token });
});

router.get("/user", existsToken, async (req, res) => {
  const user = getTokenInfo(req.token).payload;
  const userFromDb = await getUserById(user._id);
  success(res, userFromDb);
});

module.exports = router;
