const express = require("express");
const router = express.Router();
const UserModel = require("../../models/User");
const validate = require("../../helpers/validations/validate");
const imageController = require("../../controllers/imageController");
const {
  uploadImageValidation,
  requireIdValidation,
  updateImageValidation,
  favoriteImageValidation,
} = require("../../helpers/validations/validations");

router.get("/", imageController.getImages);

router.get("/favorite", imageController.getFavoriteImages);

router.post(
  "/upload",
  validate(uploadImageValidation),
  imageController.uploadImage
);

router.delete(
  "/:id",
  validate(requireIdValidation),
  imageController.deleteImage
);

router.put(
  "/:id",
  validate(requireIdValidation),
  validate(updateImageValidation),
  imageController.updateImage
);

router.patch(
  "/favorite",
  validate(favoriteImageValidation),
  imageController.toggleFavoriteImage
);
module.exports = router;
