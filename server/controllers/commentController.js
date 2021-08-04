class CommentController {
  constructor() {
    this.CommentModel = require("../models/Comment");
    this.ImageModel = require("../models/Image");
  }

  async getComments() {
    const data = await this.CommentModel.find({}).lean();
    return data;
  }

  async insertComment(payload) {
    const data = this.CommentModel(payload);
    const saved = await data.save();
    const p1 = saved
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

    const p2 = this.ImageModel.findByIdAndUpdate(payload.image_id, {
      $push: { comments: data._id },
    });
    const [savePopulated] = await Promise.all([p1, p2]);
    return savePopulated;
  }

  async deleteComment(id, idUser) {
    const data = await this.CommentModel.deleteOne({ _id: id, user: idUser });
    return data;
  }

  async editComment(_id, content, idUser) {
    const data = await this.CommentModel.updateOne(
      { _id, user: idUser },
      { content },
      { new: true }
    );
    return data;
  }

  async deleteAllCommentsByPost(image_id) {
    const data = await this.CommentModel.deleteMany({ image_id });
    return data;
  }
}

module.exports = new CommentController();
