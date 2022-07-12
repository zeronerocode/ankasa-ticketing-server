const express = require("express");
const router = express.Router();


const flightsRoute = require('./flights')
const usersRoute = require('./users')
const admin = require('./Admin/index')
const profile = require('./profile')

router
.use('/flights', flightsRoute)
.use('/users', usersRoute)
.use('/admin', admin)
.use('/profile', profile)


module.exports = router;
