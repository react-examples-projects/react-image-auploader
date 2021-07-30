const express = require("express");
const router = express.Router();
const ImageController = require("../../controllers/imageController");
const UserModel = require("../../models/User");
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

router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    let { title, tags } = req.body;
    if (title.trim().length < 1) title = "Sin título";
    const data = await ImageController.updateImage({ id, title, tags });
    success(res, {
      ...data,
      title,
      tags,
      id,
    });
  } catch (err) {
    next(err);
  }
});

router.patch("/favorite", async (req, res, next) => {
  try {
    const imageId = req.body.imageId;
    const userId = req.user._id;
    const user = await UserModel.findById(userId).lean();
    const isFavoriteImage = user.favoritesImages
      .map((id) => id.toString())
      .includes(imageId);
    const dynamicQuery = isFavoriteImage
      ? {
          $pull: {
            favoritesImages: imageId,
          },
        }
      : {
          $push: {
            favoritesImages: imageId,
          },
        };
    const data = await UserModel.findByIdAndUpdate(userId, dynamicQuery);
    res.json(data);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
