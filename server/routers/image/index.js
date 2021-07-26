const express = require("express");
const router = express.Router();
const ImageController = require("../../controllers/imageController");
const { success } = require("../../helpers/httpResponses");

router.get("/", async (req, res, next) => {
  try {
    const data = await ImageController.getImages();
    success(res, data);
  } catch (err) {
    next(err);
  }
});

router.post("/upload", async (req, res, next) => {
  const { title } = req.body;
  try {
    const data = await ImageController.insertImage({
      url_base64: req.files.images.data,
      name: req.user.name,
      title,
      tags: req.body["tags[]"],
      user: req.user._id,
    });
    success(res, data, 201);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await ImageController.deleteImage(id, req.user._id);
    success(res, {
      ...data,
      id,
    });
  } catch (err) {  
    next(err);
  }
});
module.exports = router;
