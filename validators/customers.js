const Joi = require("joi");

const patchConnectionSchema = Joi.object({
  name: Joi.string().trim().min(5).max(50).required(),
  description: Joi.string().optional(),
  url: Joi.string().uri().required(),
});

module.exports = { patchConnectionSchema };
