const { body } = require("express-validator");
const validate = require("../middlewares/handleValidation");

exports.loginValidator = validate([
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("password").notEmpty().withMessage("Password is required"),
]);
