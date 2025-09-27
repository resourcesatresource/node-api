const mongoose = require("mongoose");

const { throwError } = require("../utils/errors");
const { ErrorKind } = require("../constants/errors");

const validateInputFields = (schema, input) => {
  try {
    const { error } = schema.validate(input);

    if (error) {
      throw Error(error?.details?.[0]?.message);
    }
  } catch (error) {
    throwError(ErrorKind.badRequest, error.message);
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
