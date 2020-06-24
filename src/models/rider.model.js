/* eslint-disable */
const mongoose = require('mongoose');
const validator = require('validator');
//geolocation schema
// const GeoSchema = new mongoose.Schema({
//   type: {
//     type: String,
//     default: 'Point',
//   },
//   coordinates: {
//     type: [Number],
//     index: '2dsphere',
//   },
// });

const riderSchema = mongoose.Schema(
  {
    id: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid Email');
        }
      },
    },
    dob: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    location: [Number]
  },
  {
    timestamps: true,
  }
);

const Rider = mongoose.model('riders', riderSchema);

module.exports = Rider;
