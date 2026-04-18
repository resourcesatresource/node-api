const Joi = require("joi");

const patchConnectionSchema = Joi.object({
  name: Joi.string().trim().min(5).max(50).required(),
  description: Joi.string().optional(),
  url: Joi.string().uri().required(),
  iconName: Joi.string().optional(),
});

const patchEditConnectionSchema = Joi.object({
  name: Joi.string().trim().min(5).max(50).optional(),
  description: Joi.string().optional(),
  url: Joi.string().uri().optional(),
  iconName: Joi.string().optional(),
});

module.exports = { patchConnectionSchema, patchEditConnectionSchema };
