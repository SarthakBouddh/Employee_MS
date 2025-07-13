const mongoose = require("mongoose");
const config = require("./config");

const dbConnect = async () => {
  const uri = config.MONGODB;
  if (!uri) {
    console.error("❌ MONGO_URI is undefined");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Wait 5s for MongoDB server
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    // Optional: retry after a delay instead of exiting
    setTimeout(() => {
      console.log("🔁 Retrying DB connection...");
      dbConnect();
    }, 5000); // retry after 5 seconds
  }
};

module.exports = dbConnect;
