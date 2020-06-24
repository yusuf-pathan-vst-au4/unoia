const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const validator = require('validator');

const memberSchema = mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    default: 'John Doe',
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email');
      }
    },
  },
  role: {
    type: String,
    default: 'user',
  },
});

const TeamSchema = mongoose.Schema(
  {
    parent_id: {
      type: String,
      allow: null,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    company: {
      type: String,
    },
    image: {
      type: String,
      required: false,
      trim: true,
      default: '',
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    members: {
      type: [memberSchema],
      unique: false,
      default: undefined,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    updatedBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    deletedBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    // toObject: { getters: true },
    // toJSON: { getters: true },
  }
);

// Attach Soft Delete Plugin With Model
TeamSchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;
