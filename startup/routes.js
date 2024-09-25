const express = require("express");
const { genres, customers, users, auth } = require("../routes");
const { error, logger } = require("../middleware");

module.exports = function (app) {
  app.use(express.json());

  /*
    `logger` middleware logs the http(s) requests info when the
    development environment is running.
  */
  app.use(logger);

  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/users", users);
  app.use("/api/auth", auth);

  /*
    This middleware catches the any error occurred while completing
    the whole process and it formats the error and return response.
  */
  app.use(error);
};
