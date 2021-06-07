const express = require("express");
const router = express.Router();
const existsToken = require("../middlewares/existsToken");

// sub-routers
const userRouters = require("./user");
const authRouters = require("./auth");
const imageRouters = require("./image");

router.use("/user", existsToken, userRouters);
router.use("/auth", authRouters);
router.use("/images", existsToken, imageRouters);

module.exports = router;
