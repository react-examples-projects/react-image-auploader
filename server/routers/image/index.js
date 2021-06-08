const express = require("express");
const router = express.Router();
const { uploadImages } = require("../../helpers/requests");
const insertImage = require("../../controllers/insertImage");
const getImages = require("../../controllers/getImages");
const { success } = require("../../helpers/httpResponses");

router.get("/", async (req, res, next) => {
  try {
    const data = await getImages();
    success(res, data);
  } catch (err) {
    next(err);
  }
});

router.post("/upload", async (req, res, next) => {
  try {
    const data = await uploadImages(req.files.images.data);
    insertImage({ url_image: data.url, name: req.body.name });
    success(res, data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
