const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee",
    },

    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task", // Reference to Task model
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.verifyPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
