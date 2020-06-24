const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const teamRoute = require('./team.route');
const memberRoute = require('./member.route');
const riderRoute = require('./rider.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/teams', teamRoute);
router.use('/teams/:teamId/members', memberRoute);
router.use('/riders', riderRoute);

module.exports = router;
