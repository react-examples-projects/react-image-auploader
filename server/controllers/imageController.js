class ImageController {
  constructor() {
    this.ImageModel = require("../models/Image");
    this.UserModel = require("../models/User");
    this.CommentController = require("../controllers/commentController");
    this.UserController = require("../controllers/userController");
    this.uploadImages = require("../helpers/requests").uploadImages;
  }

  async getImages() {
    const images = await this.ImageModel.find({})
      .populate([
        {
          path: "comments",
          // a inside populate for Comment.user
          populate: {
            path: "user",
            select: {
              name: 1,
              isAdmin: 1,
              _id: 1,
              perfil_photo: 1,
            },
          },
        },
        {
          path: "user",
          select: {
            _id: 1,
            name: 1,
            perfil_photo: 1,
          },
        },
      ])
      .lean();
    return images;
  }

  async insertImage({ url_base64, name, title, tags, user }) {
    const data = await this.uploadImages(url_base64);
    const newImage = this.ImageModel({
      url_image: data.url,
      name,
      title,
      tags,
      user,
    });
    const img = await newImage.save();
    const imgPopulated = await img
      .populate({
        path: "user",
        select: {
          _id: 1,
          name: 1,
          perfil_photo: 1,
        },
      })
      .execPopulate();
    return imgPopulated.toObject();
  }

  async deleteImage(id, idUser) {
    const p1 = this.CommentController.deleteAllCommentsByPost(id);
    const p2 = this.UserController.deleteFavorite({ idUser, idImage: id });
    const p3 = this.ImageModel.deleteOne({ _id: id, user: idUser });
    const [commentsDelete, , imageDeleted] = await Promise.all([p1, p2, p3]);
    return {
      ...imageDeleted,
      commentsDelete,
    };
  }

  async updateImage({ id, ...content }) {
    const imageUpdated = await this.ImageModel.findByIdAndUpdate(
      id,
      content
    ).lean();
    return imageUpdated;
  }

  async getFavoriteImages(idUser) {
    const user = await this.UserModel.findOne({
      _id: idUser,
    }).populate({
      path: "favoritesImages",
      populate: [
        {
          path: "user",
          select: { _id: 1, name: 1 },
        },
        {
          path: "comments",
          select: { _id: 1, content: 1, user: 1 },
          populate: {
            path: "user",
            select: { _id: 1, name: 1, perfil_photo: 1 },
          },
        },
      ],
    });

    return user?.favoritesImages;
  }
}

module.exports = new ImageController();
