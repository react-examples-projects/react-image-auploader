const express = require("express");
const router = express.Router();
const CommentController = require("../../controllers/commentController");
const validate = require("../../helpers/validations/validate");
const {
  requireIdValidation,
  addCommentValidation,
} = require("../../helpers/validations/validations");
const { success } = require("../../helpers/httpResponses");

router.get("/", async (req, res, next) => {
  try {
    const data = await CommentController.getComments();
    success(res, data);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { image_id, content } = req.body;
    const data = await CommentController.insertComment({
      image_id,
      content,
      name: req.user.name,
      user: req.user._id,
    });
    success(res, data, 201);
  } catch (err) {
    next(err);
  }
});

router.delete(
  "/:id",
  validate(requireIdValidation),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await CommentController.deleteComment(id, req.user._id);
      success(res, data);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  validate(requireIdValidation),
  validate(addCommentValidation),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const content = req.body.content;
      const data = await CommentController.editComment(
        id,
        content,
        req.user._id
      );
      success(res, data);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
