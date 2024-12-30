const express = require("express");

const { genres, customers, users, auth } = require("../../routes");

const router = express.Router();

router.use("/genres", genres);
router.use("/customers", customers);
router.use("/users", users);
router.use("/auth", auth);

module.exports = router;
