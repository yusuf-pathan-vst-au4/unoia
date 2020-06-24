const moment = require('moment');
const config = require('../config/config');
const userService = require('./user.service');
const tokenService = require('./token.service');
const emailService = require('./email.service');
const Invite = require('../models/invite.model');

const generateInvitationToken = async email => {
  const user = await userService.getUserByEmail(email);
  const expires = moment().add(config.jwt.invitationExpirationMinutes, 'minutes');
  const invitationToken = tokenService.generateToken(user._id, expires);
  await tokenService.saveToken(invitationToken, user._id, expires, 'invitation');
  return invitationToken;
};

const storeInvite = async (invitee, inviter, source) => {
  const token = await generateInvitationToken(inviter.email);
  const inviteBody = {
    token,
    invitee,
    inviter,
    source,
  };

  const invite = await Invite.create(inviteBody);
  await emailService.sendInvitationEmail(invitee.email, token);
  return invite;
};

module.exports = {
  storeInvite,
  generateInvitationToken,
};
