/*eslint-disable*/

const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const riderValidation = require('../../validations/rider.validation');
const riderController = require('../../controllers/rider.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(riderValidation.createRider), riderController.createRider)
  .get(auth('getRiders'),riderController.getRiders);

router
  .route('/:id')
  .get(validate(riderValidation.getRider), riderController.getRider)
  .patch( validate(riderValidation.updateRider), riderController.updateRider)
  .delete(validate(riderValidation.deleteRider), riderController.deleteRider);
module.exports = router;
