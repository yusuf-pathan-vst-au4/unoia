const httpStatus = require('http-status');
const { pick } = require('lodash');
const AppError = require('../utils/AppError');
const { Team } = require('../models');
const { getQueryOptions } = require('../utils/service.util');

const checkTeam = async query => {
  let { name } = query;
  // Case Insensitive
  name = `^${name}$`;
  const team = await Team.findOne({ name: { $regex: name, $options: 'i' } });
  if (!team) {
    throw new AppError(httpStatus.NOT_FOUND, 'Team not found');
  }
  return team;
};

// Get All Teams
const getTeams = async query => {
  const filter = pick(query, ['name', 'owner', 'company']);
  const options = getQueryOptions(query);
  const teams = await Team.find(filter, null, options);

  // Create root for top-level node(s)
  let root = [];
  if (query.flat === 'true') {
    root = teams.filter(team => team.parent_id != null);
  } else {
    const rawTeams = teams.map(team => team._doc);
    rawTeams.forEach(node => {
      // No parent_id means top level
      if (!node.parent_id) return root.push(node);

      // Insert node as child of parent in teams array
      const parentIndex = rawTeams.findIndex(el => el._id.toString() === node.parent_id);

      if (!rawTeams[parentIndex].children) {
        rawTeams[parentIndex].children = [node];
        return;
      }

      rawTeams[parentIndex].children.push(node);
    });
  }

  // console.log(root)
  // console.log(teams)
  return root;
};

// Create New TEam
const createTeam = async teamBody => {
  // eslint-disable-next-line no-param-reassign
  teamBody.members = [];
  const team = await Team.create(teamBody);
  return team;
};

// Get Team By Id
const getTeamById = async teamId => {
  const team = await Team.findById(teamId).populate('owner');
  if (!team) {
    throw new AppError(httpStatus.NOT_FOUND, 'Team not found');
  }
  return team;
};

// Update Team
const updateTeam = async (teamId, updateBody) => {
  const team = await getTeamById(teamId);
  Object.assign(team, updateBody);
  await team.save();
  return team;
};

// Delete TEam
const deleteTeam = async teamId => {
  const team = await getTeamById(teamId);
  await team.delete();
  return team;
};

module.exports = {
  checkTeam,
  getTeams,
  createTeam,
  getTeamById,
  updateTeam,
  deleteTeam,
};
