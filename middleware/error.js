const { ENVIRONMENT } = require("../constants");

/*
  This middleware captures error and formats it
  with status code and returns error message in response.
*/
module.exports = function (err, _, res, next) {
  let code = 500,
    message = "Something went wrong";

  const error = err?.message?.split(":");

  [message, code, id] = error;

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
