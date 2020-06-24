/* eslint-disable */

const httpStatus = require('http-status');
const { pick } = require('lodash');
const AppError = require('../utils/AppError');
const { Rider } = require('../models');
const { getQueryOptions } = require('../utils/service.util');

const checkDuplicateEmail = async email => {
  const rider = await Rider.findOne({ email });
  if (rider) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
};

const createRider = async riderBody => {
  await checkDuplicateEmail(riderBody.email);
  const rider = await Rider.create(riderBody);
  return rider;
};

const getRiders = async () => {
  const riders = await Rider.find();
  return riders;
};

const getRiderById = async id => {
  const rider = await Rider.findById(id);
  if (!rider) {
    throw new AppError(httpStatus.NOT_FOUND, 'Rider not found');
  }
  return rider;
};

const updateRider = async (id, updateBody) => {
  const rider = await getRiderById(id);
  // if (updateBody.email) {
  //   await checkDuplicateEmail(updateBody.email);
  // }
  Object.assign(rider, updateBody);
  await rider.save();
  return rider;
};

const deleteRider = async id => {
  const rider = await Rider.findById(id);
  await rider.remove();
  return rider;
};

module.exports = { createRider, getRiders, getRiderById, updateRider, deleteRider };
