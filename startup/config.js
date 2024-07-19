const config = require("config");
module.exports = function () {
  if (!config.has("jwtprivatekey") || !config.has("databaseUrl")) {
    console.error("FATAL ERROR: jwtprivatekey and databaseUrl not defined");
    process.exit(1);
  }
};
