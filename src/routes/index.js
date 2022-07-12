const express = require("express");
const router = express.Router();


const flightsRoute = require('./flights')
const bookingRoute = require('./bookings')
const usersRoute = require('./users')
const admin = require('./Admin/index')
const profile = require('./profile')

router
.use('/flights', flightsRoute)
.use('/bookings', bookingRoute)
.use('/users', usersRoute)
.use('/admin', admin)
.use('/profile', profile)


module.exports = router;
