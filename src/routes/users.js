const express = require('express')
const router = express.Router()
const { register, login, refreshToken, forgetPassword, activation, resetPass} = require('../controller/authController.js')
// const { protect } = require('../middleware/auth.js')
// const { protect } = require('../middlewares/auth.js')

router
  .post('/register', register)
  .post('/login', login)   
  .post('/refresh-token', refreshToken)
  .post('/forgotpassword', forgetPassword)
  .get('/activate/:token/:id', activation)
  .put('/forgot/:token', resetPass)

module.exports = router