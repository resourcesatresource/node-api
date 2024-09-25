const bcrypt = require("bcrypt");

const { MAX_ENCRYPTION_ROUND } = require("../../constants");

const generateHash = async (value) => {
  const salt = await bcrypt.genSalt(MAX_ENCRYPTION_ROUND);
  return bcrypt.hash(value, salt);
};

const compareHash = async (value, hash) => {
  return bcrypt.compare(value, hash);
};

module.exports = { generateHash, compareHash };
