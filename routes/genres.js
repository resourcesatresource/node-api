const express = require("express");

const { auth } = require("../middleware/");
const { asyncWrapper } = require("../utils");
const {
  postGenresHandler,
  deleteGenresHandler,
  getGenreHandler,
  getGenresHandler,
  putGenreHandler,
} = require("../controller/genres");

const router = express.Router();

router.get("/", asyncWrapper(getGenresHandler));

router.get("/:id", asyncWrapper(getGenreHandler));

router.post("/", auth, asyncWrapper(postGenresHandler));

router.put("/:id", auth, asyncWrapper(putGenreHandler));

router.delete("/:id", [auth], asyncWrapper(deleteGenresHandler));

module.exports = router;
