const mongoose = require("mongoose");

const { throwError } = require("../utils/errors");
const { ErrorKind } = require("../constants/errors");

const validateInputFields = (schema, input) => {
  const { error } = schema.validate(input);

  if (error) {
    throw Error(error?.details?.[0]?.message);
  }
};

const validateObjectId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);

  if (!isValid) {
    throwError(ErrorKind.noRecordsFound);
  }

  return mongoose.Types.ObjectId.isValid(id);
};

module.exports = { validateInputFields, validateObjectId };
