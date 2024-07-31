const Joi = require("joi");

const postUserAuthenticationSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().required(),
});

const postAdminRequestSchema = Joi.object({
  email: Joi.string().email().trim().required(),
});

module.exports = { postAdminRequestSchema, postUserAuthenticationSchema };
