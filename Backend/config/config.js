require("dotenv").config();

module.exports = {
  // JWT / Auth configuration
  MONGODB : process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtTokenExpiresIn: process.env.JWT_EXPIRES_IN || 3600, // in seconds
};
