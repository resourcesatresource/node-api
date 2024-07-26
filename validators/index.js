const mongoose = require("mongoose");

const validateInputFields = (schema, input, res) => {
  const { error } = schema.validate(input);

  if (error) {
    throw Error(error?.details?.[0]?.message);
  }
};

const validateObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports = { validateInputFields, validateObjectId };
