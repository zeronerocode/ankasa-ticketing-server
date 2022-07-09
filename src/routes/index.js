<<<<<<< HEAD
const express = require('express')
const router = express.Router()
const admin = require('./Admin/index')
// const usersRoute = require('./users')

router
  .use('/admin', admin)
=======
const express = require("express");
const router = express.Router();

// const usersRoute = require('./users')

router;
// .use('/users', usersRoute)
>>>>>>> f7963a169d1bb6eeafdaf8151a988d3b61977528

module.exports = router;
