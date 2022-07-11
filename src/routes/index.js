const express = require('express')
const router = express.Router()
const admin = require('./Admin/index')
// const usersRoute = require('./users')

router
  .use('/admin', admin)

module.exports = router;
