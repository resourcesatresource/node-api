const express = require("express");

const { admin, auth } = require("../middleware");
const {
  patchConnectionHandler,
  getCustomersHandler,
  getCustomerDetailsHandler,
  postCustomerHandler,
} = require("../controller/customers");
const { asyncWrapper } = require("../utils");

const router = express.Router();

router.get("/", [auth, admin], asyncWrapper(getCustomersHandler));

router.post("/", auth, asyncWrapper(postCustomerHandler));

router.get("/:id", asyncWrapper(getCustomerDetailsHandler));

router.patch("/connections", auth, asyncWrapper(patchConnectionHandler));

module.exports = router;
