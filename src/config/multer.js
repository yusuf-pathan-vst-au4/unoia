const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const config = require('./config');

cloudinary.config(config.cloudinary);

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'images',
  allowedFormats: ['jpg', 'png'],
});
const upload = multer({
  storage,
});

module.exports = upload;
