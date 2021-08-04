class ImageController {
  constructor() {
    this.ImageModel = require("../models/Image");
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
    const imgPopulated = img
      .populate({
        path: "user",
        select: {
          _id: 1,
          name: 1,
          perfil_photo: 1,
        },
      })
      .execPopulate();
    return imgPopulated;
  }

  async deleteImage(id, idUser) {
    const commentsDelete = await this.CommentController.deleteAllCommentsByPost(
      id
    );
    const imageDeleted = await this.ImageModel.deleteOne({
      _id: id,
      user: idUser,
    });

    await this.UserController.deleteFavorite({
      idUser,
      idImage: id,
    });
    
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
}

module.exports = new ImageController();
