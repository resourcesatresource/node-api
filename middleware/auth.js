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

    // 1. If the token doesn't exists, the user is unauthorized to access the resources.
    if (!token) {
      return res
        .status(getErrorDetails(ErrorKind.unauthorized).code)
        .json({
          message: getErrorDetails(ErrorKind.unauthorized).message,
          error: "An authentication token is required to access this resource.",
        })
        .end();
    }

    const { code, message } = getErrorDetails(ErrorKind.invalidCredentials);

    try {
      const decoded = jwt.verify(token, config.get("jwtprivatekey"));
      const user = await getByEmail(decoded.email);

      // 2. If the token is provided is old and the user no longer exists.
      if (!user) {
        return res
          .status(code)
          .json({
            message,
            error: "This user no longer exists.",
          })
          .end();
      }

      req.user = user;
      next();
    } catch (error) {
      // 3. If the token is provided has invalid signature.
      return res
        .status(code)
        .json({
          message,
          error,
        })
        .end();
    }
  };
}

module.exports = auth;
