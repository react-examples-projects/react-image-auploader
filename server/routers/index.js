const express = require("express");
const router = express.Router();
const existsToken = require("../middlewares/existsToken");

// sub-routers
const userRouters = require("./user");
const authRouters = require("./auth");
const imageRouters = require("./image");
const commentRouters = require("./comment");

router.use("/user", existsToken, userRouters);
router.use("/auth", authRouters);
router.use("/images", existsToken, imageRouters);
router.use("/comment", existsToken, commentRouters);

module.exports = router;
