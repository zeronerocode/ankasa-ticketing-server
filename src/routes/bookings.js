const express = require("express");
const bookingsController = require("../controller/bookingsController");
const { protect } = require('../middleware/auth')
const router = express.Router();

router
    .post('/', protect, bookingsController.createBooking)
    .get('/', protect, bookingsController.getCustomerBookings)
    .get('/:id', protect, bookingsController.getDetailBooiking)

module.exports = router