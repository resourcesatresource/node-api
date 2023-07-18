const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Genre, validateGenre } = require("../models/genre");

router.get("/", async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const genre = Genre.find({ _id: req.params.id });
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  console.log(genre);
  res.status(200).send(genre);
});

// adding gener to the db
router.post("/", auth, async (req, res, next) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({
    name: req.body.name,
  });
  try {
    const data = await genre.save();
    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res) => {
  let genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  genre = await genre.save();
  res.send(genre);
});

// we will give access to delete only to the admin
router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

module.exports = router;
