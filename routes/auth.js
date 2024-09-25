const express = require("express");
const { pick } = require("lodash");

const { User } = require("../models/user");
const { validateInputFields } = require("../validators");
const { postUserAuthenticationSchema } = require("../validators/users");
const { asyncWrapper } = require("../utils");
const { compareHash } = require("../services/bcrypt");
const { throwError } = require("../utils/errors");

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

module.exports = router;
