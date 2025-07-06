const express = require("express");
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const taskRoutes = require("./routes/taskRoutes");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
database();

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/task", taskRoutes);
app.use("/api/v1/employee", employeeRoutes);

//def route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
