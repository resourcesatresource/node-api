const express = require("express");

const api = require("./api");
const { error, logger } = require("../../middleware");
const { CUSTOM_RESPONSE_STATUS } = require("../../constants");

module.exports = function (app) {
  app.use(express.json());

  app.get("/health-check", async (_, res) => {
    return res.json({
      status: CUSTOM_RESPONSE_STATUS.OK,
    });
  });

  /*
    `logger` middleware logs the http(s) requests info when the
    development environment is running.
  */
  app.use(logger);

  app.use("/api", api);

  /*
    This middleware catches the any error occurred while completing
    the whole process and it formats the error and return response.
  */
  app.use(error);
};
