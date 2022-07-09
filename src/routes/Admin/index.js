const express = require('express')
const { login } = require('../../controller/Admin/auth')
const upload = require('../../middleware/multer')
const router = express.Router()
const airlanes = require('./airlanes')
const ticket = require('./tiket')

router
  .use('/airlanes', airlanes)
  .use('/ticket', ticket)
  .post('/login', upload.none(), login)
module.exports = router