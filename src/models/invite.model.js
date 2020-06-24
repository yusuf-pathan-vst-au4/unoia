const mongoose = require('mongoose');
// const validator = require('validator');

const inviteSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
    ref: 'token',
  },
  invitee: {
    type: Object,
    required: true,
  },
  inviter: {
    type: Object,
    required: true,
  },
  message: {
    type: String,
    max: 300,
  },
  source: {
    type: String,
  },
  state: {
    type: String,
    enum: ['unsent', 'aborted', 'pending', 'bounced', 'accepted', 'ignored', 'rejected', 'expired', 'blocked'],
    default: 'pending',
  },
  meta: {
    type: Object,
  },
});

const Invite = mongoose.model('Invite', inviteSchema);

module.exports = Invite;
