const express = require("express");
const router = express.Router();

const usersRoute = require('./users')
const admin = require('./Admin/index')

router
.use('/users', usersRoute)
.use('/admin', admin)


module.exports = router;
