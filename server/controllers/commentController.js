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
        },
      })
      .execPopulate();
    return saved;
  }
}

module.exports = new CommentController();
