const config = require("config");
module.exports = function () {
  if (!config.get("jwtprivatekey")) {
    console.error("FATAL ERROR: jwtprivatekey not defined");
    process.exit(1);
  }
};
