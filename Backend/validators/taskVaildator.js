const { body } = require("express-validator");
const validate = require("../middlewares/handleValidation");
const { query } = require("express-validator");

exports.createTaskValidator = validate([
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("assignedDate")
    .notEmpty()
    .withMessage("Assigned date is required")
    .isISO8601()
    .withMessage("Assigned date must be a valid date"),
  body("category").notEmpty().withMessage("Category is required"),
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["new", "active", "completed", "failed"])
    .withMessage("Invalid status"),
  body("employeeId")
    .notEmpty()
    .withMessage("Employee ID is required")
    .isMongoId()
    .withMessage("Invalid employee ID"),
]);

exports.getTasksByStatusValidator = validate([
  query("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["new", "active", "completed", "failed", "all"])
    .withMessage("Status must be one of: new, active, completed, failed"),
]);
