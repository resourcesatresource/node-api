const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  mongoose
    .connect(config.get("databaseUrl"))
    .then(() => {
      console.log("Connection successful");
    })
    .catch((e) => {
      console.error("Connection failed", e);
    });
};
