const express = require('express')
const router = express.Router()
const airlanes = require('./airlanes')
const ticket = require('./tiket')

router
  .use('/airlanes', airlanes)
  .use('/ticket', ticket)

module.exports = router