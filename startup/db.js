const mongoose = require("mongoose");
const config = require("config");
module.exports = function () {
  // Connecting to mongodb
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Connection successful");
    })
    .catch((e) => {
      console.error("error occured", e);
    });
};
