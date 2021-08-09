const CommentService = require("../services/commentService");
const { success } = require("../helpers/httpResponses");

class CommentController {
  async getComments(req, res, next) {
    try {
      const data = await CommentService.getComments();
      success(res, data);
    } catch (err) {
      next(err);
    }
  }

  async insetComment(req, res, next) {
    try {
      const { image_id, content } = req.body;
      const data = await CommentService.insertComment({
        image_id,
        content,
        name: req.user.name,
        user: req.user._id,
      });
      success(res, data, 201);
    } catch (err) {
      next(err);
    }
  }

  async deleteComment(req, res, next) {
    try {
      const id = req.params.id;
      const data = await CommentService.deleteComment(id, req.user._id);
      success(res, data);
    } catch (err) {
      next(err);
    }
  }

  async updateComment(req, res, next) {
    try {
      const id = req.params.id;
      const content = req.body.content;
      const data = await CommentService.editComment(id, content, req.user._id);
      success(res, data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CommentController();
