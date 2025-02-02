const jwt = require("jsonwebtoken");
const config = require("config");

const { getByEmail } = require("../models/user");
const { ErrorKind, getErrorDetails } = require("../constants/errors");

function auth(configs = { viaBody: false }) {
  return async (req, res, next) => {
    let token;

    if (configs?.viaBody) {
      ({ token } = req.body);
    } else {
      token = req.header("x-auth-token");
    }

    if (!token)
      return res
        .status(getErrorDetails(ErrorKind.unauthorized).code)
        .json({ message: getErrorDetails(ErrorKind.unauthorized).message })
        .end();

    try {
      const decoded = jwt.verify(token, config.get("jwtprivatekey"));
      const user = await getByEmail(decoded.email);
      req.user = user;
      next();
    } catch (error) {
      return res
        .status(getErrorDetails(ErrorKind.invalidCredentials).code)
        .json({
          message: getErrorDetails(ErrorKind.invalidCredentials).message,
        })
        .end();
    }
  };
}

module.exports = auth;
