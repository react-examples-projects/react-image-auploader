class CommentController {
  constructor() {
    this.CommentModel = require("../models/Comment");
    this.ImageModel = require("../models/Image");
  }

  async getComments() {
    const data = await this.CommentModel.find({});
    return data;
  }

  async insertComment(payload) {
    const data = this.CommentModel(payload);
    await this.ImageModel.findByIdAndUpdate(payload.image_id, {
      $push: {
        comments: data._id,
      },
    });
    const saved = await data.save();
    const populated = await saved
      .populate({
        path: "user",
        select: {
          name: 1,
          isAdmin: 1,
          _id: 1,
          perfil_photo: 1,
        },
      })
      .execPopulate();
    return populated;
  }

  async deleteComment(id, idUser) {
    const data = await this.CommentModel.deleteOne({ _id: id, user: idUser });
    return data;
  }

  async editComment(_id, content, idUser) {
    const data = await this.CommentModel.updateOne(
      { _id, user: idUser },
      {
        content,
      }
    );
    return data;
  }

  async deleteAllCommentsByPost(image_id) {
    const data = await this.CommentModel.deleteMany({ image_id });
    return data;
  }
}

module.exports = new CommentController();
