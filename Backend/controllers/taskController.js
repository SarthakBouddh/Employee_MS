const Task = require("../models/taskModel");
const User = require("../models/userModel");

exports.createTask = async (req, res) => {
  try {
    const admin = req.user;
    if (admin.role !== "admin") {
      return res.status(403).json({
        status: "fail",
        message: "Only admins can assign tasks.",
      });
    }

    const { employeeId, title, description, assignedDate, category, status } =
      req.body;
    const employee = await User.findById(employeeId);
    if (!employee || employee.role !== "employee") {
      return res.status(404).json({
        status: "fail",
        message: "Employee not found",
      });
    }

    const newTask = await Task.create({
      title,
      description,
      assignedDate,
      category,
      status,
      assignedTo: employee._id,
    });

    // ✅ Add task ID to employee's task list
    employee.tasks.push(newTask._id);
    await employee.save();

    res.status(201).json({
      status: "success",
      message: "Task assigned successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getTasksByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    const userId = req.user.userId;

    const user = await User.findById(userId).populate("tasks");
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    let filteredTasks;
    if (status === "all") {
      filteredTasks = user.tasks;
    } else {
      filteredTasks = user.tasks.filter((task) => task.status === status);
    }

    res.status(200).json({
      status: "success",
      results: filteredTasks.length,
      tasks: filteredTasks,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
