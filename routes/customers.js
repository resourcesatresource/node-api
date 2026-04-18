const express = require("express");

const { admin, auth } = require("../middleware");
const {
  patchConnectionHandler,
  getCustomersHandler,
  getCustomerDetailsHandler,
  postCustomerHandler,
  deleteConnectionHandler,
  patchEditConnectionHandler,
} = require("../controller/customers");
const { asyncWrapper } = require("../utils");
const { AdminAccessLevel } = require("../constants/enum");

const router = express.Router();

router.get(
  "/",
  [auth(), admin([AdminAccessLevel.superUser])],
  asyncWrapper(getCustomersHandler),
);

router.post("/", auth(), asyncWrapper(postCustomerHandler));

router.get("/:id", asyncWrapper(getCustomerDetailsHandler));

router.patch("/connections", auth(), asyncWrapper(patchConnectionHandler));

router.delete(
  "/connections/:id",
  auth(),
  asyncWrapper(deleteConnectionHandler),
);

router.patch(
  "/connections/:id",
  auth(),
  asyncWrapper(patchEditConnectionHandler),
);

module.exports = router;
