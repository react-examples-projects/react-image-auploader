const express = require("express");
const router = express.Router();
const validate = require("../../helpers/validations/validate");
const { loginSchemaValidation } = require("../../helpers/validations/validations");
const authController = require("../../controllers/authController");

router.post("/login", validate(loginSchemaValidation), authController.login);

module.exports = router;
