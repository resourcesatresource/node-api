const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/user");

// Login route
// This will authenticate the user and return jwt token
router.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.send("user not found").status(400);

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) {
    return res.status(400).send("Invalid Password or User");
  }
  const token = user.generateAuthToken();
  res.status(200).send(token);
});

module.exports = router;
