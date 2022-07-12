const express = require("express");
const router = express.Router();

const usersRoute = require('./users')
const admin = require('./Admin/index')
const profile = require('./profile')

router
.use('/users', usersRoute)
.use('/admin', admin)
.use('/profile', profile)


module.exports = router;
