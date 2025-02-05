const express = require("express");
const { pick } = require("lodash");

const { User, getByEmail, update: updateUser } = require("../models/user");
const { validateInputFields } = require("../validators");
const {
  postUserAuthenticationSchema,
  postUserPasswordResetRequestSchema,
  postUserResetPasswordSchema,
} = require("../validators/users");
const { asyncWrapper } = require("../utils");
const { compareHash, generateHash } = require("../services/bcrypt");
const { sendEmail } = require("../services/nodemailer");
const { throwError } = require("../utils/errors");
const { ErrorKind } = require("../constants/errors");
const { getVerifiedAndDecodeTokenDetails } = require("../services/jwt");
const { postVerifyAuthTokenHandler } = require("../controller/authentications");
const { auth } = require("../middleware");
const { CUSTOM_RESPONSE_STATUS, TIME_FACTOR } = require("../constants");
const {
  isResetTokenExpired,
} = require("../controller/authentications/helpers");

const RESET_EMAIL_DETAILS = {
  SUBJECT: "[Movies Genres]: Password Reset Request",
  TEXT: 'Click this link to reset your password for "Movies Genres" -\nhttps://movies-genres.netlify.app/reset-password?token={{resetToken}}\nThis link is only valid for 1 hour from now.\n\nTeam ASAP - Movies Genres',
};

const router = express.Router();

router.post(
  "/",
  asyncWrapper(async (req, res) => {
    validateInputFields(postUserAuthenticationSchema, req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throwError("userWithEmailNotExists");
    }

    const isValid = await compareHash(password, user.password);
    if (!isValid) {
      throwError("invalidPassword");
    }

    const secureToken = user.generateAuthToken();

    const response = pick(user, ["_id", "name", "email", "isAdmin"]);

    return res.json({ secureToken, user: response });
  })
);

router.post(
  "/request-reset-password",
  asyncWrapper(async (req, res) => {
    validateInputFields(postUserPasswordResetRequestSchema, req.body);

    const { email } = req.body;

    const user = await getByEmail(email);

    if (!user) {
      throwError(ErrorKind.userWithEmailNotExists);
    }

    if (user?.reset_token?.expires_at) {
      if (!isResetTokenExpired(user?.reset_token?.expires_at)) {
        throwError(ErrorKind.resetTokenAlreadyExists);
      }
    }

    const resetToken = user.generateAuthToken({ expiresIn: "1h" });

    await sendEmail(
      email,
      RESET_EMAIL_DETAILS.SUBJECT,
      RESET_EMAIL_DETAILS.TEXT.replace("{{resetToken}}", resetToken)
    );

    const newTokenExpiresAt = new Date();
    newTokenExpiresAt.setTime(
      newTokenExpiresAt.getTime() +
        TIME_FACTOR.MINUTES_IN_AN_HOUR *
          TIME_FACTOR.SECONDS_IN_AN_HOUR *
          TIME_FACTOR.MILLISECONDS_IN_A_SECOND
    );

    await updateUser(email, {
      reset_token: {
        expires_at: newTokenExpiresAt,
      },
    });

    return res
      .json({
        status: CUSTOM_RESPONSE_STATUS.OK,
      })
      .end();
  })
);

router.post(
  "/reset-password",
  asyncWrapper(async (req, res) => {
    const { validationToken, newPassword } = req.body;

    validateInputFields(postUserResetPasswordSchema, req.body);

    const { email } = getVerifiedAndDecodeTokenDetails(validationToken);

    const user = await getByEmail(email);

    if (!user) {
      throwError(ErrorKind.userWithEmailNotExists);
    }

    const hashedNewPassword = await generateHash(newPassword);

    const updatedUser = await updateUser(email, {
      password: hashedNewPassword,
    });

    if (!updatedUser) {
      throwError(ErrorKind.unableToUpdateData);
    }

    return res.json({ status: CUSTOM_RESPONSE_STATUS.OK }).end();
  })
);

router.post(
  "/verify-token",
  auth({ viaBody: true }),
  asyncWrapper(postVerifyAuthTokenHandler)
);

module.exports = router;
