const User = require("../models/userModel");
const Task = require("../models/taskModel");

exports.addEmployees = async (req  , res , next) => {
  try {
  } catch (error) {
    next(error);
  }
}

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" })
      .select("-password")
      .populate("tasks");

    res.status(200).json({
      status: "success",
      results: employees.length,
      data: employees,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    const validStatuses = ["active", "completed", "failed"];
    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid status value" });
    }
    const task = await Task.findById(taskId);

    if (!task) {
      return res
        .status(404)
        .json({ status: "fail", message: "Task not found" });
    }

    task.status = status;
    await task.save();

    res.status(200).json({
      status: "success",
      message: `Task marked as ${status}`,
      task,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
