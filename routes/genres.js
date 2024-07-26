const express = require("express");
const router = express.Router();
const { admin, auth } = require("../middleware/");
const { asyncWrapper } = require("../utils");
const {
  postGenresHandler,
  deleteGenresHandler,
  getGenreHandler,
  getGenresHandler,
  putGenreHandler,
} = require("../controller/genres");

router.get("/", asyncWrapper(getGenresHandler));

router.get("/:id", asyncWrapper(getGenreHandler));

router.post("/", auth, asyncWrapper(postGenresHandler));

router.put("/:id", auth, asyncWrapper(putGenreHandler));

router.delete("/:id", [auth, admin], asyncWrapper(deleteGenresHandler));

module.exports = router;
