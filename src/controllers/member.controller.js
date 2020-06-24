const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { teamService } = require('../services');
const { memberService } = require('../services');
const AppError = require('../utils/AppError');

const index = catchAsync(async (req, res) => {
  const team = await teamService.getTeamById(req.params.teamId);

  // Thror Error if user isn't admin & isn't owner of team
  if (req.user.role !== 'admin' && team.owner.id !== req.user.id) {
    throw new AppError(httpStatus.FORBIDDEN, `You don't have rights to perform this action`);
  }
  const members = await memberService.getMembers(team, req.query);
  res.status(httpStatus.OK).json(members);
});

const store = catchAsync(async (req, res) => {
  const team = await teamService.getTeamById(req.params.teamId);

  // Thror Error if user isn't admin & isn't owner of team
  if (req.user.role !== 'admin' && team.owner.id !== req.user.id) {
    throw new AppError(httpStatus.FORBIDDEN, `You don't have rights to perform this action`);
  }
  await memberService.addMember(team, req.body, req.user);
  res.status(httpStatus.CREATED).send(team);
});

const show = catchAsync(async (req, res) => {
  const team = await teamService.getTeamById(req.params.id);
  res.status(httpStatus.OK).send(team);
});

const destroy = catchAsync(async (req, res) => {
  const team = await teamService.getTeamById(req.params.teamId);

  // Thror Error if user isn't admin & isn't owner of team
  if (req.user.role !== 'admin' && team.owner.id !== req.user.id) {
    throw new AppError(httpStatus.FORBIDDEN, `You don't have rights to perform this action`);
  }
  await memberService.deleteMember(team, req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  index,
  store,
  show,
  destroy,
};
