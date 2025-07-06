const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connected  Successfully"))
    .catch((error) => {
      console.log("Issue in DB Connection");
      console.error(error.message);
      console.log(error);
    });
};

module.exports = dbConnect;
