const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/userModel");
const { MONGODB } = require("./config/config");

const users = [
  {
    firstName: "Amit",
    lastName: "Sharma",
    email: "employee1@example.com",
    password: "123",
    role: "employee",
    tasks: [],
  },
  {
    firstName: "Priya",
    lastName: "Sharma",
    email: "employee2@example.com",
    password: "123",
    role: "employee",
    tasks: [],
  },
  {
    firstName: "Rahul",
    lastName: "Sharma",
    email: "employee3@example.com",
    password: "123",
    role: "employee",
    tasks: [],
  },
  {
    firstName: "Sneha",
    lastName: "Sharma",
    email: "employee4@example.com",
    password: "123",
    role: "employee",
    tasks: [],
  },
  {
    firstName: "Vikram",
    lastName: "Sharma",
    email: "employee5@example.com",
    password: "123",
    role: "employee",
    tasks: [],
  },
  {
    firstName: "Sarthak",
    lastName: "Bouddh",
    email: "sarthak@gmail.com",
    password: "1",
    role: "admin",
    tasks: [],
  },
];

const insertUsers = async () => {
  try {
    await mongoose.connect("mongodb+srv://Sarthak_BoP:Sarthak17@ems.pgpquhn.mongodb.net/");
    console.log("✅ Connected to MongoDB");

    await User.deleteMany({}); // Clears existing users

    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      })
    );

    await User.insertMany(hashedUsers);
    console.log("✅ Users inserted successfully");

    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error inserting users:", error);
    process.exit(1);
  }
};

module.exports = insertUsers;
