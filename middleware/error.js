const { ENVIRONMENT } = require("../constants");

const DEFAULT = {
  ERROR_MESSAGE: "Something went wrong",
  ERROR_CODE: 500,
};

/*
  This middleware captures error and formats it
  with status code and returns error message in response.
*/
module.exports = function (err, _, res, next) {
  const error = err?.message?.split(":");

  const [message = DEFAULT.ERROR_MESSAGE, code = DEFAULT.ERROR_CODE, id] =
    error;

  if (+code < 100 || +code > 599) {
    code = 500;
  }

  if (process.env.NODE_ENV === ENVIRONMENT.development) {
    console.log({
      errorCode: code,
      errorMessage: message,
    });
  }

  return res.status(+code).json({ message, id }).end();
};
