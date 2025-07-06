const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Import models
const User = require("./models/userModel");
const Task = require("./models/taskModel");

// Data from localStorage.jsx
const employees = [
  {
    id: 1,
    firstName: "Amit",
    email: "employee1@example.com",
    password: "123",
    taskCount: {
      active: 1,
      newTask: 1,
      completed: 1,
      failed: 1,
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Prepare sales report",
        description: "Compile and analyze sales data for Q1.",
        assignedDate: "2025-04-01",
        category: "Reporting",
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "Client follow-up emails",
        description: "Send follow-up emails to prospective clients.",
        assignedDate: "2025-03-25",
        category: "Communication",
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        title: "Update internal wiki",
        description: "Add documentation for new CRM process.",
        assignedDate: "2025-03-20",
        category: "Documentation",
      },
    ],
  },
  {
    id: 2,
    firstName: "Priya",
    email: "employee2@example.com",
    password: "123",
    taskCount: {
      active: 2,
      newTask: 1,
      completed: 1,
      failed: 1,
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Create marketing materials",
        description: "Design flyers and banners for the campaign.",
        assignedDate: "2025-04-03",
        category: "Marketing",
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        title: "Research competitors",
        description: "Gather data on key competitors' strategies.",
        assignedDate: "2025-04-02",
        category: "Research",
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "Write blog post",
        description: "Publish an article on recent trends.",
        assignedDate: "2025-03-28",
        category: "Content",
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        title: "Survey feedback analysis",
        description: "Analyze customer feedback from surveys.",
        assignedDate: "2025-03-26",
        category: "Analysis",
      },
    ],
  },
  {
    id: 3,
    firstName: "Rahul",
    email: "employee3@example.com",
    password: "123",
    taskCount: {
      active: 3,
      newTask: 2,
      completed: 1,
      failed: 1,
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Develop landing page",
        description: "Create a responsive landing page for new product.",
        assignedDate: "2025-04-04",
        category: "Development",
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "Fix website bugs",
        description: "Resolve layout and responsiveness issues.",
        assignedDate: "2025-03-30",
        category: "Bug Fix",
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        title: "Optimize database",
        description: "Refactor database queries for performance.",
        assignedDate: "2025-03-27",
        category: "Database",
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        title: "Test new API endpoints",
        description: "Run integration tests for recently developed APIs.",
        assignedDate: "2025-04-01",
        category: "Testing",
      },
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Code review for teammates",
        description: "Review pull requests and provide feedback.",
        assignedDate: "2025-04-05",
        category: "Code Review",
      },
    ],
  },
  {
    id: 4,
    firstName: "Sneha",
    email: "employee4@example.com",
    password: "123",
    taskCount: {
      active: 2,
      newTask: 1,
      completed: 1,
      failed: 1,
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Design onboarding flow",
        description: "Create UI mockups for the new user onboarding flow.",
        assignedDate: "2025-04-03",
        category: "Design",
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "Revise brand guidelines",
        description: "Update colors and typography as per new strategy.",
        assignedDate: "2025-03-29",
        category: "Branding",
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        title: "User research interviews",
        description: "Conduct and document user interviews.",
        assignedDate: "2025-03-27",
        category: "UX Research",
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        title: "Design dashboard widgets",
        description: "Create modular components for analytics dashboard.",
        assignedDate: "2025-04-02",
        category: "Design",
      },
    ],
  },
  {
    id: 5,
    firstName: "Vikram",
    email: "employee5@example.com",
    password: "123",
    taskCount: {
      active: 3,
      newTask: 2,
      completed: 2,
      failed: 1,
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Setup CI/CD pipeline",
        description: "Automate build and deployment process.",
        assignedDate: "2025-04-04",
        category: "DevOps",
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "Deploy backend service",
        description: "Deploy the authentication service on staging.",
        assignedDate: "2025-03-30",
        category: "Deployment",
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        title: "Monitor server logs",
        description: "Track and document server performance issues.",
        assignedDate: "2025-03-28",
        category: "Monitoring",
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        title: "Configure load balancer",
        description: "Set up HAProxy for load balancing traffic.",
        assignedDate: "2025-04-01",
        category: "Networking",
      },
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Write deployment script",
        description: "Automate the deployment workflow using shell scripts.",
        assignedDate: "2025-04-05",
        category: "Scripting",
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "Review security policy",
        description: "Go through current policies and suggest updates.",
        assignedDate: "2025-03-29",
        category: "Security",
      },
    ],
  },
];

const defaultAdmin = [
  {
    id: 1,
    email: "sarthak@gmail.com",
    password: "1",
  },
];

// Helper function to convert task status
const convertTaskStatus = (task) => {
  if (task.active) return "active";
  if (task.completed) return "completed";
  if (task.failed) return "failed";
  if (task.newTask) return "new";
  return "new";
};

// Main upload function
const uploadData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB successfully");

    // Clear existing data (optional - remove if you want to keep existing data)
    await User.deleteMany({});
    await Task.deleteMany({});
    console.log("Cleared existing data");

    // Upload admin
    console.log("Uploading admin...");
    const hashedAdminPassword = await bcrypt.hash(defaultAdmin[0].password, 10);
    const admin = await User.create({
      email: defaultAdmin[0].email,
      password: hashedAdminPassword,
      role: "admin",
    });
    console.log("Admin uploaded successfully");

    // Upload employees and their tasks
    console.log("Uploading employees and tasks...");
    for (const employeeData of employees) {
      // Hash password
      const hashedPassword = await bcrypt.hash(employeeData.password, 10);
      
      // Create employee
      const employee = await User.create({
        firstName: employeeData.firstName,
        email: employeeData.email,
        password: hashedPassword,
        role: "employee",
      });

      console.log(`Created employee: ${employee.firstName}`);

      // Create tasks for this employee
      const taskIds = [];
      for (const taskData of employeeData.tasks) {
        const task = await Task.create({
          title: taskData.title,
          description: taskData.description,
          assignedDate: new Date(taskData.assignedDate),
          category: taskData.category,
          status: convertTaskStatus(taskData),
          assignedTo: employee._id,
        });
        taskIds.push(task._id);
        console.log(`Created task: ${task.title} for ${employee.firstName}`);
      }

      // Update employee with task references
      await User.findByIdAndUpdate(employee._id, {
        tasks: taskIds,
      });
    }

    console.log("Data upload completed successfully!");
    console.log(`Uploaded ${employees.length} employees and ${employees.reduce((total, emp) => total + emp.tasks.length, 0)} tasks`);
    console.log("Admin credentials:");
    console.log(`Email: ${defaultAdmin[0].email}`);
    console.log(`Password: ${defaultAdmin[0].password}`);

  } catch (error) {
    console.error("Error uploading data:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

// Run the upload
uploadData(); 