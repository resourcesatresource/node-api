const mongoose = require("mongoose");
module.exports = function () {
  // Connecting to mongodb
  mongoose
    .connect("mongodb://localhost/vidly")
    .then(() => {
      console.log("Connection successful");
    })
    .catch((e) => {
      console.error("error occured", e);
    });
};
