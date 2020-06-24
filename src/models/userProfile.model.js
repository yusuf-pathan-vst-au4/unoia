const mongoose = require('mongoose');

const userProfileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    childrens: [{ type: String }],
    reportsTo: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    dob: {
      type: String,
      required: false,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
    isChildren: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

const userProfile = mongoose.model('userProfile', userProfileSchema);

module.exports = userProfile;
