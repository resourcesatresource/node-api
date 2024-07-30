const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const _ = require("lodash");
const { validateInputFields } = require("../validators");
const { postUserAuthenticationSchema } = require("../validators/users");
const { asyncWrapper } = require("../utils");

router.post(
  "/",
  asyncWrapper(async (req, res) => {
    validateInputFields(postUserAuthenticationSchema, req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw Error("400:User not found for this id");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw Error("400:Invalid Password for the user");
    }

    const secureToken = user.generateAuthToken();
    const response = _.pick(user, ["_id", "name", "email", "isAdmin"]);

    return res.json({ secureToken, user: response });
  })
);

module.exports = router;
