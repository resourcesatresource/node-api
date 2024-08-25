const { getErrorDetails } = require("../../constants/errors");

const throwError = (kind) => {
  const { code, message } = getErrorDetails(kind);

  throw Error(`${code}:${message}`);
};

module.exports = { throwError };
