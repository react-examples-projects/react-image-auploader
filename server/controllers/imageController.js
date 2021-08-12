const ImageService = require("../services/imageService");
const UserModel = require("../models/User");
const { success } = require("../helpers/httpResponses");
class ImageController {
  async getImages(req, res, next) {
    try {
      const data = await ImageService.getImages();
      success(res, data);
    } catch (err) {
      next(err);
    }
  }

  async getFavoriteImages(req, res, next) {
    try {
      const favoriteImages = await ImageService.getFavoriteImages(req.user._id);
      success(res, favoriteImages);
    } catch (err) {
      next(err);
    }
  }

  async uploadImage(req, res, next) {
    try {
      const { title } = req.body;
      const data = await ImageService.insertImage({
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
  }

  async deleteImage(req, res, next) {
    try {
      const id = req.params.id;
      const data = await ImageService.deleteImage(id, req.user._id);
      success(res, {
        ...data,
        id,
      });
    } catch (err) {
      next(err);
    }
  }

  async updateImage(req, res, next) {
    try {
      const id = req.params.id;
      let { title, tags } = req.body;
      if (title.trim().length < 1) title = "Sin título";
      const data = await ImageService.updateImage({ id, title, tags });
      success(res, {
        ...data,
        title,
        tags,
        id,
      });
    } catch (err) {
      next(err);
    }
  }

  async toggleFavoriteImage(req, res, next) {
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
  }
}

module.exports = new ImageController();
