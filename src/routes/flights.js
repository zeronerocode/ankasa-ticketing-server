const express = require("express");
// const { protect } = require('../middleware/auth')
const flightsController = require("../controller/flightsController");
const router = express.Router();

router.get("/", flightsController.getDataFlights);

module.exports = router;
