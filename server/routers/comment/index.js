const express = require("express");
const router = express.Router();
const validate = require("../../helpers/validations/validate");
const {
  requireIdValidation,
  addCommentValidation,
} = require("../../helpers/validations/validations");
const commentController = require("../../controllers/commentController");

router.get("/", commentController.getComments);
router.post(
  "/",
  validate(addCommentValidation),
  commentController.insetComment
);

router.delete(
  "/:id",
  validate(requireIdValidation),
  commentController.deleteComment
);

router.put(
  "/:id",
  validate(requireIdValidation),
  validate(addCommentValidation),
  commentController.updateComment
);

module.exports = router;
