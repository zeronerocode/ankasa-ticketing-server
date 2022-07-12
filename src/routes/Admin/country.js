const express = require('express')
const { getCountry, detailCountry, createCountry, updateCountry, deleteCountry } = require('../../controller/Admin/country')
const upload = require('../../middleware/multer')
const router = express.Router()

router
.get('/getcountry', getCountry)
.get('/detailcountry/:id',detailCountry)
.post('/newcountry', upload.single('image'), createCountry)
.put('/updatecountry/:id', upload.single('image'), updateCountry)
.delete('/deletecountry/:id', deleteCountry)

module.exports = router