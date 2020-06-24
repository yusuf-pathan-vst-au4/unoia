const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { teamService } = require('../services');
const storage = require('../config/multer');

const index = catchAsync(async (req, res) => {
  const { query } = req;

  // If not the admin filter teams based on owner
  if (req.user.role !== 'admin') query.owner = req.user.id;
  const teams = await teamService.getTeams(req.query);
  res.status(httpStatus.OK).json(teams);
});

const store = catchAsync(async (req, res) => {
  const { body } = req;

  // If no owner selected Make current user owner of team
  if (!body.owner) body.owner = req.user._id;
  const team = await teamService.createTeam(body);
  res.status(httpStatus.CREATED).send(team);
});

const uploadImage = catchAsync(async (req, res) => {
  const upload = storage.single('file');
  upload(req, res, async function(err) {
    if (err) {
      return res.status(500).send({ error: err });
    }
    const { file } = req;
    res.json(file);
  });
});

const check = catchAsync(async (req, res) => {
  await teamService.checkTeam(req.query);
  res.status(httpStatus.NO_CONTENT).send();
});

const show = catchAsync(async (req, res) => {
  const team = await teamService.getTeamById(req.params.id);
  res.status(httpStatus.OK).send(team);
});

const update = catchAsync(async (req, res) => {
  const team = await teamService.updateTeam(req.params.id, req.body);
  res.send(team);
});

const destroy = catchAsync(async (req, res) => {
  await teamService.deleteTeam(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  index,
  check,
  uploadImage,
  store,
  show,
  update,
  destroy,
};
