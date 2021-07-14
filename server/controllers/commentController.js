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

  async deleteComment(id) {
    const data = await this.CommentModel.deleteOne({ _id: id });
    return data;
  }

  async editComment(_id, content) {
    const data = await this.CommentModel.updateOne(
      { _id },
      {
        content,
      }
    );
    return data;
  }
}

module.exports = new CommentController();
