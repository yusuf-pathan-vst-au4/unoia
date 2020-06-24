const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const addTeam = {
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(5)
      .max(20),
    parent_id: Joi.string().allow(null),
    company: Joi.string(),
    description: Joi.string().max(300),
    image: Joi.string()
      .uri()
      .required()
      .allow(''),
    owner: Joi.string().custom(objectId),
    isActive: Joi.boolean(),
  }),
};

const addMember = {
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    userId: Joi.string().custom(objectId),
    name: Joi.string(),
    role: Joi.string().valid('user', 'team-lead'),
  }),
};

module.exports = {
  addTeam,
  addMember,
};
