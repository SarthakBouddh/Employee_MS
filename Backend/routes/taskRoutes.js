const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");
const taskValidator = require("../validators/taskVaildator");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/create",
  authMiddleware.protect,
  authMiddleware.authorizeRoles("admin"),
  taskValidator.createTaskValidator,
  taskController.createTask
);
router.get(
  "/get-tasks",
  authMiddleware.protect,
  authMiddleware.authorizeRoles("employee"),
  taskValidator.getTasksByStatusValidator,
  taskController.getTasksByStatus
);

module.exports = router;
