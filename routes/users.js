const express = require("express");

const { admin, auth } = require("../middleware");
const {
  getUserHandler,
  postUserHandler,
  postAdminRequestHandler,
  getAdminStatusHandler,
  postAdminHandler,
  postResetPasswordHandler,
} = require("../controller/users");
const { asyncWrapper } = require("../utils");

const router = express.Router();

router.get("/", [auth, admin], asyncWrapper(getUserHandler));

router.post("/", asyncWrapper(postUserHandler));

router.post("/change-password", [auth], asyncWrapper(postResetPasswordHandler));

router.post("/admin", auth, asyncWrapper(postAdminRequestHandler));

router.post("/admin/:id", [auth, admin], asyncWrapper(postAdminHandler));

router.get("/admin/:id", asyncWrapper(getAdminStatusHandler));

module.exports = router;
