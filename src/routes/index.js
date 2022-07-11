const express = require("express");
const router = express.Router();

const flightsRoute = require('./flights')
const bookingRoute = require('./bookings')

router
.use('/flights', flightsRoute)
.use('/bookings', bookingRoute)


module.exports = router;
