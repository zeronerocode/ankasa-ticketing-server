const express = require('express')
const { createFlights, getFlights, detailFlights, deleteFlights, updateFlights, switchStatus } = require('../../controller/Admin/tiket')
const upload = require('../../middleware/multer')
const router = express.Router()

router
.get('/getflights', getFlights)
.get('/detailflights/:id', detailFlights)
.post('/newflights', upload.none(), createFlights)
.put('/updateflights/:id', upload.none(), updateFlights)
.put('/switch/:id', switchStatus)
.delete('/deleteflights/:id', deleteFlights)

module.exports = router