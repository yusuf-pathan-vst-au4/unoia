/*eslint-disable*/

const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const createRider = {
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    name: Joi.string().required(),
    dob: Joi.required(),
    address: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    location: Joi.required(),
  }),
};

const getRiders = {
  query: Joi.object().keys({
    name: Joi.string(),
  }),
};

// const getRider = {
//   params: Joi.object().keys({
//     riderid:
//   }),
// };

const updateRider = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email(),
      name: Joi.string().required(),
      dob: Joi.required(),
      address: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      country: Joi.string().required(),
      location: Joi.required(),
    })
    .min(1),
};

const deleteRider = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createRider,
  getRiders,
  // getRider,
  updateRider,
  deleteRider,
};
