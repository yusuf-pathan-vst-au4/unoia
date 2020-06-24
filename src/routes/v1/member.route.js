const express = require('express');
const auth = require('../../middlewares/auth');
const memberController = require('../../controllers/member.controller');
const validate = require('../../middlewares/validate');
const teamValidation = require('../../validations/team.validation');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(auth('getMembers'), memberController.index)
  .post(auth('addMembers'), validate(teamValidation.addMember), memberController.store);

router
  .route('/:id')
  //   .get(auth(), memberController.show)
  //   .put(auth(), memberController.update)
  .delete(auth('deleteMembers'), memberController.destroy);

module.exports = router;
