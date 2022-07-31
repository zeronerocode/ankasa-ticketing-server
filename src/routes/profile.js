const express = require('express')
const router = express.Router()
const { insertProfile, Profile} = require('../controller/profileController.js')
const { protect } = require('../middleware/auth.js')
const upload = require("../middleware/multer");

router
  .put('/',protect,upload.single("photo"), insertProfile)
  .get('/',protect,Profile)

module.exports = router