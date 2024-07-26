const { Genre, deleteById, getById } = require("../../models/genre");
const { validateInputFields, validateObjectId } = require("../../validators");
const { postSchema } = require("../../validators/genres");

const getGenresHandler = async (_, res) => {
  const response = await Genre.find();
  return res.json(response);
};

const getGenreHandler = async (req, res) => {
  const id = req.params.id;
  const isValid = validateObjectId(id);

  if (!isValid) {
    throw Error("404:This genre doesn't exist");
  }

  const genre = await Genre.findOne({ _id: req.params.id });

  if (!genre) throw Error("404:The genre with the given ID was not found.");

  return res.json(genre);
};

const postGenresHandler = async (req, res) => {
  validateInputFields(postSchema, req.body, res);

  const { name } = req.body;

  const genre = new Genre({
    name,
  });

  const response = await genre.save();

  res.json(response);
};

const deleteGenresHandler = async (req, res) => {
  const id = req.params.id;
  const isValid = validateObjectId(id);

  if (!isValid) {
    throw Error("404:The genre with the given ID was not found.");
  }

  const genre = await getById(id);
  if (!genre) throw Error("404:The genre with the given ID was not found.");

  const response = await deleteById(id);

  if (!response) throw Error("404:The genre with the given ID was not found.");

  res.json({ response });
};

const putGenreHandler = async (req, res) => {
  const id = req.params.id;
  const isValid = validateObjectId(id);

  if (!isValid) {
    throw Error("404:The genre with the given ID was not found.");
  }

  let genre = await Genre.findById(id);
  if (!genre) throw Error("404:The genre with the given ID was not found.");

  validateInputFields(postSchema, req.body);

  const { name } = req.body;

  genre.name = name;
  genre = await genre.save();
  if (!genre) {
    throw Error("Unable to update data");
  }
  return res.json(genre);
};

module.exports = {
  deleteGenresHandler,
  getGenresHandler,
  getGenreHandler,
  postGenresHandler,
  putGenreHandler,
};
