const express = require("express");
const bookingsController = require("../controller/bookingsController");
// const { protect } = require('../middleware/auth')
const router = express.Router();

router
    .post('/', bookingsController.createBooking)

module.exports = router