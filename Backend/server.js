const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - Allow requests from Vercel domain
app.use(cors({
  origin: [
    'https://employee-ms-eta.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection with error handling
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("MONGO_URI environment variable is not set");
      return false;
    }
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    return true;
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    return false;
  }
};

// Initialize database connection
let dbConnected = false;
connectDB().then(connected => {
  dbConnected = connected;
});

// Import routes only if they exist
let authRoutes, employeeRoutes, taskRoutes;

try {
  authRoutes = require("./routes/authRoutes");
  employeeRoutes = require("./routes/employeeRoutes");
  taskRoutes = require("./routes/taskRoutes");
} catch (error) {
  console.error("Error loading routes:", error.message);
}

// Routes - only add if they exist and database is connected
if (authRoutes && dbConnected) {
  app.use("/api/v1/auth", authRoutes);
}

if (employeeRoutes && dbConnected) {
  app.use("/api/v1/employee", employeeRoutes);
}

if (taskRoutes && dbConnected) {
  app.use("/api/v1/task", taskRoutes);
}

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Employee Management System API is running",
    database: dbConnected ? "connected" : "disconnected"
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
    database: dbConnected ? "connected" : "disconnected",
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`MongoDB URI: ${process.env.MONGO_URI ? 'Set' : 'Not set'}`);
  console.log(`Database Status: ${dbConnected ? 'Connected' : 'Disconnected'}`);
});
