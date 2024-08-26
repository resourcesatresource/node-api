const mongoose = require("mongoose");

const constructObjectId = (id) => {
  return new mongoose.Types.ObjectId(id);
};

module.exports = {
  constructObjectId,
};
