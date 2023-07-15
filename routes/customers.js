const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
// importing customer module
const Customer = require("../models/customer");

router.get("/", auth, async (req, res) => {
  const user = await Customer.find();
  res.send(user);
});

router.post("/", auth, async (req, res) => {
  let newUser = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  const addedUser = await newUser.save();
  res.send(addedUser);
});

module.exports = router;
