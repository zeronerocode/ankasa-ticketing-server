const express = require('express')
const { login } = require('../../controller/Admin/auth')
const upload = require('../../middleware/multer')
const router = express.Router()
const airlanes = require('./airlanes')
const booking = require('./booking')
const country = require('./country')

router
  .use('/airlanes', airlanes)
  .use('/booking', booking)
  .use('/country', country)
  .post('/login', upload.none(), login)
module.exports = router