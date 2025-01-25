const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  let url = config.get("databaseUrl");

  const currentEnvironment = process.env.NODE_ENV;

  if (currentEnvironment === "production") {
    url = config.get("prodDatabaseUrl");
  }

  mongoose
    .connect(url)
    .then(() => {
      console.log("Connection successful");
    })
    .catch((e) => {
      console.error("Connection failed", e);
    });
};
