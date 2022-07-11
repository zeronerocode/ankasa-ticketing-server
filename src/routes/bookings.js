const express = require("express");
const bookingsController = require("../controller/bookingsController");
// const { protect } = require('../middleware/auth')
const router = express.Router();

router
    .post('/', bookingsController.createBooking)
    .get('/', bookingsController.getCustomerBookings)

module.exports = router