const express = require('express')
const router = express.Router()
const { insertProfile} = require('../controller/profileController.js')
const { protect } = require('../middleware/auth.js')
const upload = require("../middleware/multer");

router
  .put('/',protect,upload.single("photo"), insertProfile)

module.exports = router