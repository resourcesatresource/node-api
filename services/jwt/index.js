const config = require("config");
const jwt = require("jsonwebtoken");

const { throwError } = require("../../utils/errors");
const { ErrorKind } = require("../../constants/errors");
const { log } = require("../../utils/logger");

const getVerifiedAndDecodeTokenDetails = (token) => {
  try {
    const decodedCredentials = jwt.verify(token, config.get("jwtprivatekey"));

    if (!decodedCredentials) {
      throwError(ErrorKind.invalidCredentials);
    }

    return decodedCredentials;
  } catch (error) {
    log.error(error);
    throwError(ErrorKind.invalidCredentials);
  }
};

module.exports = { getVerifiedAndDecodeTokenDetails };
