const config = require("config");
const nodemailer = require("nodemailer");

const { throwError } = require("../../utils/errors");
const { ErrorKind } = require("../../constants/errors");

let nodemailerTransporter = null;

const EMAIL_USER = config.get("config.nodemailer.email");
const EMAIL_PASS = config.get("config.nodemailer.password");

const init = () => {
  nodemailerTransporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
};

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    if (!nodemailer) {
      throwError(ErrorKind.unableToSendResetLink);
    }

    await nodemailerTransporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
    throwError(ErrorKind.unableToSendResetLink);
  }
};

module.exports = { init, sendEmail };
