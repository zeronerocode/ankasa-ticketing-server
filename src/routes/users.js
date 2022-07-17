const express = require('express')
const router = express.Router()
const { register, login, refreshToken, forgetPassword} = require('../controller/authController.js')
// const { protect } = require('../middleware/auth.js')
// const { protect } = require('../middlewares/auth.js')

router
  .post('/register', register)
  .post('/login', login)   
  .post('/refresh-token', refreshToken)
  .post('/forgotpassword', forgetPassword)
// .get('/', protect, getUsers)
//   .delete('/:id', deleteUser)

module.exports = router