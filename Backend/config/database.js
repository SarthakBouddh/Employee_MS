const mongoose = require("mongoose");
const config = require("../config/config");
require("dotenv").config();

const dbConnect = () => {
  console.log("MONGODB", config.MONGODB);
  mongoose
    .connect(config.MONGODB)
    .then(() => console.log("DB Connected  Successfully"))
    .catch((error) => {
      console.log("Issue in DB Connection");
      console.error(error.message);
      process.exit(1);
    });
};

module.exports = dbConnect;
