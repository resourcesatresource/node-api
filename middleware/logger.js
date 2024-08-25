const { ENVIRONMENT } = require("../constants");

function logger(req, _, next) {
  if (process.env.NODE_ENV === ENVIRONMENT.development) {
    console.log("---------- Request Start ----------");
    console.log(`
        Method: ${req?.method}
        Path: ${req?.originalUrl}
        Payload: ${JSON.stringify(req?.body)}
      `);
    console.log("---------- Request End ----------\n");
  }
  next();
}

module.exports = logger;
