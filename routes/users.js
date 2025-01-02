const express = require("express");

const { admin, auth } = require("../middleware");
const {
  getUserHandler,
  postUserHandler,
  postAdminRequestHandler,
  getAdminStatusHandler,
  postAdminHandler,
  getAdminRequestsHandler,
  postAdminRevokeHandler,
  getAdminsHandler,
} = require("../controller/users");
const { asyncWrapper } = require("../utils");
const { AdminAccessLevel } = require("../constants/enum");

const router = express.Router();

router.get(
  "/",
  [auth, admin([AdminAccessLevel.superUser])],
  asyncWrapper(getUserHandler)
);

router.post("/", asyncWrapper(postUserHandler));

router.get(
  "/admins",
  [auth, admin([AdminAccessLevel.superUser])],
  asyncWrapper(getAdminsHandler)
);

router.get(
  "/admin/requests/",
  [auth, admin([AdminAccessLevel.superUser])],
  asyncWrapper(getAdminRequestsHandler)
);

router.post("/admin", auth, asyncWrapper(postAdminRequestHandler));

router.post(
  "/admin/:id",
  [auth, admin([AdminAccessLevel.superUser])],
  asyncWrapper(postAdminHandler)
);

router.post(
  "/admin/:id/revoke",
  [auth, admin([AdminAccessLevel.superUser])],
  asyncWrapper(postAdminRevokeHandler)
);

router.get("/admin/:id", asyncWrapper(getAdminStatusHandler));

module.exports = router;
