const express = require('express')
const { getBooking, detailBooking, updateBooking, deleteBooking } = require('../../controller/Admin/booking')
const router = express.Router()

router
.get('/getbooking', getBooking)
.get('/detailbooking/:id', detailBooking)
.put('/editbooking/:id', updateBooking)
.delete('/deletebooking/:id', deleteBooking)

module.exports = router