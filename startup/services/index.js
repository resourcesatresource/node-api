const { init: initNodemailer } = require("../../services/nodemailer");

module.exports = init = () => {
  initNodemailer();
};
