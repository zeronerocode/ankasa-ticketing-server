const express = require('express')
const router = express.Router()
const { insertProfile, Profile} = require('../controller/profileController.js')
// const { protect } = require('../middleware/auth.js')
const upload = require("../middleware/multer");

router
  .put('/',upload.single("photo"), insertProfile)
  .get('/',Profile)

module.exports = router