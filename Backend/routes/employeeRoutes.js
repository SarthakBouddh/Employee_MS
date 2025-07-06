const express = require("express");
const employee = require("../controllers/employee");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get(
  "/employees",
  authMiddleware.protect,
  authMiddleware.authorizeRoles("admin"),
  employee.getAllEmployees
);

router.patch(
  "/update-task-status/:taskId",
  authMiddleware.protect,
  authMiddleware.authorizeRoles("employee"),
  employee.updateTaskStatus
);

module.exports = router;
