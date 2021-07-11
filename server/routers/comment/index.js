const express = require("express");
const router = express.Router();
const CommentController = require("../../controllers/commentController");
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
    const payload = req.body;
    const data = await CommentController.insertComment(payload);
    success(res, data, 201);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await CommentController.deleteComment(id);
    success(res, data);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const content = req.body.content;
    const data = await CommentController.editComment(id, content);
    success(res, data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
