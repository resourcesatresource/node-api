const express = require("express");
const auth = require("../middleware/auth");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");

router.get("/", auth, async (req, res) => {
  const person = await User.find();
  console.log(person);
  res.send(person);
});

router.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.send("User already exist with this email").status(400);

  // This means user doesn't exist, so we will create

  // user = new User({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password,
  // });

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  try {
    user = await user.save();
  } catch (error) {
    console.log(error.message);
    res.send(error);
  }
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["name", "email", "password"]));
});

// exporting routes
module.exports = router;
