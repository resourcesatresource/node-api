// importing endpoints
const express = require("express");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const user = require("../routes/users");
const auth = require("../routes/auth");
const { error, logger } = require("../middleware");

module.exports = function (app) {
  // api endpoints
  app.use(express.json());
  app.use(logger);

  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/users", user);
  app.use("/api/auth", auth);

  // error handling middleware
  app.use(error);
};
