const Joi = require("joi");

const getSchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
});

const postSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
});

module.exports = { getSchema, postSchema };
