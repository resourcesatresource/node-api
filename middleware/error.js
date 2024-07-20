/*
  This middleware captures error and formats it
  with status code and returns error message in response
*/
module.exports = function (err, req, res, next) {
  let code = 500,
    message = "Something went wrong";

  const error = err?.message?.split(":");

  if (error?.length === 1) {
    message = error?.[0];
  }

  if (error?.length === 2) {
    [code, message] = error;
  }

  if (+code < 100 || +code > 599) {
    code = 500;
  }

  return res.status(+code).json({ message: message }).end();
};
