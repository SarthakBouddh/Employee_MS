const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
  // Check if MONGO_URI is set
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not set in environment variables");
    console.log("Server will start without database connection");
    return;
  }

  console.log("Attempting to connect to MongoDB...");
  
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB Connected Successfully");
      console.log("Database:", mongoose.connection.db.databaseName);
    })
    .catch((error) => {
      console.log("Issue in DB Connection");
      console.error("MongoDB Connection Error:", error.message);
      
      // Don't exit the process, let it continue but log the error
      console.log("Server will continue without database connection");
    });
};

module.exports = dbConnect;
