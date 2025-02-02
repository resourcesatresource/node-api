const { ErrorKind } = require("../../constants/errors");
const { Genre, deleteById, getById } = require("../../models/genre");
const { getById: getUserById } = require("../../models/user");
const { throwError } = require("../../utils/errors");
const { validateInputFields, validateObjectId } = require("../../validators");
const { postSchema } = require("../../validators/genres");

const getGenresHandler = async (_, res) => {
  const response = await Genre.find();
  const populatedGenreWithAuthorDetails = [];

  for (const genre of response) {
    if (genre?.author) {
      const { name: authorName, email: authorEmail } = await getUserById(
        genre?.author
      );

      populatedGenreWithAuthorDetails.push({
        _id: genre._id,
        name: genre?.name,
        authorId: genre.author,
        authorEmail,
        authorName,
      });
    } else {
      populatedGenreWithAuthorDetails.push(genre);
    }
  }

  return res.json(populatedGenreWithAuthorDetails).end();
};

const getGenreHandler = async (req, res) => {
  const id = req.params.id;

  validateObjectId(id);

  const genre = await Genre.findOne({ _id: req.params.id });

  if (!genre) {
    throwError(ErrorKind.noRecordsFound);
  }

  return res.json(genre);
};

const postGenresHandler = async (req, res) => {
  validateInputFields(postSchema, req.body);

  const { name } = req.body;
  const { _id: author } = req.user;

  const genre = new Genre({
    name,
    author,
  });

  const response = await genre.save();

  if (!response) {
    throwError(ErrorKind.unableToInsertData);
  }

  res.json(response);
};

const deleteGenresHandler = async (req, res) => {
  const id = req.params.id;
  const { isAdmin, _id: userId } = req.user;

  validateObjectId(id);

  const genre = await getById(id);
  if (!genre) {
    throwError(ErrorKind.noRecordsFound);
  }

  if (!isAdmin) {
    if (userId !== genre?.author?.toString()) {
      throwError(ErrorKind.notAllowedToDelete);
    }
  }

  const response = await deleteById(id);

  if (!response) {
    throwError(ErrorKind.unableToDeleteData);
  }

  res.json({ response });
};

const putGenreHandler = async (req, res) => {
  const id = req.params.id;
  const { _id: userId } = req.user;

  validateObjectId(id);

  let genre = await Genre.findById(id);

  if (!genre) {
    throwError(ErrorKind.noRecordsFound);
  }

  if (genre.author?.toString() !== userId) {
    throwError(ErrorKind.notAllowedToEdit);
  }

  validateInputFields(postSchema, req.body);

  const { name } = req.body;

  genre.name = name;
  genre = await genre.save();

  if (!genre) {
    throwError(ErrorKind.unableToUpdateData);
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
