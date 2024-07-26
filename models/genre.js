const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

const getById = async (id) => {
  const objectId = new mongoose.Types.ObjectId(id);
  return Genre.findOne({ _id: objectId });
};

const deleteById = async (id) => {
  try {
    const response = await Genre.findByIdAndDelete(id);
    return response;
  } catch (err) {
    return;
  }
};

module.exports = { Genre, deleteById, getById };
