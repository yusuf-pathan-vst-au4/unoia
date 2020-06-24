const httpStatus = require('http-status');
// const multer = require('multer');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const storage = require('../config/multer');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user.transform());
});

const getUsers = catchAsync(async (req, res) => {
  const users = await userService.getUsers(req.query);
  const response = users.map(user => user.transform());
  res.send(response);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  res.send(user.transform());
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUser(req.params.userId, req.body);
  res.send(user.transform());
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUser(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const uploadImage = catchAsync(async (req, res) => {
  const upload = storage.single('file');
  upload(req, res, async function(err) {
    if (err) {
      return res.status(500).send({ error: err });
    }
    const { file } = req;

    await userService.updateUser(req.user._id, { image: file.url });
    res.json(file);
  });
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  uploadImage,
};
