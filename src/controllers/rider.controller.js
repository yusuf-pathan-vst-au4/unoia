/* eslint-disable*/

const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { riderService } = require('../services');

const createRider = catchAsync(async (req, res) => {
  const rider = await riderService.createRider(req.body);
  res.status(httpStatus.CREATED).send(rider);
});

const getRiders = catchAsync(async (req, res) => {
  const riders = await riderService.getRiders(req.query);
  const response = riders.map(rider => rider);
  res.send(response);
});

const getRider = catchAsync(async (req, res) => {
  const rider = await riderService.getRiderById(req.params.id);
  res.send(rider);
});

const updateRider = catchAsync(async (req, res) => {
  const rider = await riderService.updateRider(req.params.id, req.body);
  res.send(rider);
});

const deleteRider = catchAsync(async (req, res) => {
  await riderService.deleteRider(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createRider,
  getRiders,
  getRider,
  updateRider,
  deleteRider,
};
