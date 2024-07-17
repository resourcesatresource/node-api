const validateInputFields = (schema, input, res) => {
  const { error } = schema.validate(input);

  if (error) {
    throw Error(error?.details?.[0]?.message);
  }
};

module.exports = { validateInputFields };
