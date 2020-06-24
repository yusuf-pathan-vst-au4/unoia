const express = require('express');
const auth = require('../../middlewares/auth');
const teamController = require('../../controllers/team.controller');
const validate = require('../../middlewares/validate');
const teamValidation = require('../../validations/team.validation');

const router = express.Router();

router.route('/check').get(teamController.check);

router
  .route('/')
  .get(auth('getAllTeams', 'getMyTeams'), teamController.index)
  .post(auth('createTeam'), validate(teamValidation.addTeam), teamController.store);

router
  .route('/:id')
  .get(auth(), teamController.show)
  .put(auth('updateTeam'), teamController.update)
  .delete(auth('deleteTeam'), teamController.destroy);

router.post('/upload', teamController.uploadImage);

module.exports = router;
