const Joi = require("joi");

const postSchema = Joi.object({
  name: Joi.string().min(3).required(),
});

module.exports = { postSchema };
