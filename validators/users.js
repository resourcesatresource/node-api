const Joi = require("joi");

const postAdminRequestSchema = Joi.object({
  email: Joi.string().email().trim().required(),
});

module.exports = { postAdminRequestSchema };
