const Joi = require("joi");

const postUserAuthenticationSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().required(),
});

const postAdminRequestSchema = Joi.object({
  email: Joi.string().email().trim().required(),
});

const postUserSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().min(5).required(),
});

module.exports = {
  postAdminRequestSchema,
  postUserAuthenticationSchema,
  postUserSchema,
};
