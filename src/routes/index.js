const express = require("express");
const router = express.Router();

const flightsRoute = require('./flights')

router
.use('/flights', flightsRoute)


module.exports = router;
