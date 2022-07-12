const express = require('express')
const { getBooking, detailBooking, updateBooking, deleteBooking } = require('../../controller/Admin/booking')
const router = express.Router()

router
.get('/getbooking', getBooking)
.get('/detailbooking', detailBooking)
.put('/editbooking', updateBooking)
.delete('/deletebooking', deleteBooking)

module.exports = router