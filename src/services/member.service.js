/* eslint-disable no-restricted-syntax */
const httpStatus = require('http-status');
const AppError = require('../utils/AppError');
const { Team } = require('../models');
const { userService } = require('./index');
const invitationService = require('./invitation.service');

const checkDuplicateMember = async (email, team) => {
  const isExists = team.members.find(el => el.email === email);
  if (isExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
};

// Get All Teams Members
const getMembers = async team => {
  const members = [];
  for await (const member of team.members) {
    const user = await userService.getUserByEmail(member.email);
    const membera = { user };
    const membera2 = member._doc;
    // Object.assign(member, { user });
    members.push({ ...membera2, ...membera });
  }
  return members;
  // const teams = await Team.findById(team.id).populate({
  //   path: 'members.userId',
  //   model: 'User',
  // });
  // return teams;
};

// Add New Member
const addMember = async (team, memberBody, inviter) => {
  // Check if member already Exists or not
  await checkDuplicateMember(memberBody.email, team);
  // Add userId if user already exists
  const user = await userService.getUserByEmail(memberBody.email);
  // eslint-disable-next-line no-param-reassign
  if (user) memberBody.userId = user.id;

  // send Invite if new user
  if (!user) {
    await invitationService.storeInvite(memberBody, inviter, 'addMember');
  }
  // Push Member in Teams
  team.members.push(memberBody);
  team.save();
  return team;
};

// Get Member By Id
const getMemberById = async teamId => {
  const team = await Team.findById(teamId);
  if (!team) {
    throw new AppError(httpStatus.NOT_FOUND, 'Team not found');
  }
  return team;
};

// Delete Member From Team
const deleteMember = async (team, memberId) => {
  team.members.pull(memberId);
  team.save();

  return team;
};

module.exports = {
  getMembers,
  addMember,
  getMemberById,
  deleteMember,
};
