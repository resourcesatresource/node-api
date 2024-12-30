const { getErrorDetails } = require("../../constants/errors");

const throwError = (kind, id = "") => {
  const { code, message } = getErrorDetails(kind);

  let ERROR_STRING = `${message}:${code}`;

  if (id) {
    ERROR_STRING += `:${id}`;
  }

  throw Error(ERROR_STRING);
};

module.exports = { throwError };
