const { ENVIRONMENT } = require("../../constants");

const isDevEnv = () => process.env.NODE_ENV === ENVIRONMENT.development;

const error = (error) => {
  if (isDevEnv()) {
    console.log(error);
  }
};

const log = {
  error,
};

module.exports = { log };
