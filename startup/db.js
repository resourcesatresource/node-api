const mongoose = require("mongoose");
const config = require("config");
module.exports = function () {
  // Connecting to mongodb
  mongoose
    .connect(config.get("databaseUrl"))
    .then(() => {
      console.log("Connection successful");
    })
    .catch((e) => {
      console.error("error occured", e);
    });
};
