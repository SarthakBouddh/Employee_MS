const config = require("../config/config");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.login = async (req, res, next) => {
  try {
    console.log('Login attempt:', { email: req.body.email });
    
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return next(new AppError("Email and password are required", 400));
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user || user.isDeleted) {
      return next(new AppError("No user found with this email.", 404)); // User not found
    }

    // Check if the password is correct
    const correctPassword = await user.verifyPassword(password);
    if (!correctPassword) {
      return next(new AppError("Incorrect email or password", 401));
    }

    // Check if JWT secret is configured
    if (!config.jwtSecret) {
      console.error('JWT_SECRET is not configured');
      return next(new AppError("Server configuration error", 500));
    }

    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      expiresIn: config.jwtTokenExpiresIn,
    });

    // 3. Set cookie with token
    res.cookie("jwt", token, {
      httpOnly: true, // prevent client JS access
      secure: process.env.NODE_ENV === "production", // only over HTTPS in prod
      sameSite: "Strict", // CSRF protection
      maxAge: Number(config.jwtTokenExpiresIn.slice(0, -1)) * 24 * 60 * 60 * 1000, // removed d from duration (eg 90d)
    });

    console.log('Login successful for user:', user.email);

    // Send the token as response
    res.status(200).json({
      status: "success",
      message: "Logged in successfully",
      data: { user, token },
    });
  } catch (error) {
    console.error('Login error:', error);
    next(error);
  }
};
