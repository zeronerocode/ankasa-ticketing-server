const express = require('express')
const { updateUsers, detailUsers, getAllUser, deleteUsers } = require('../../controller/Admin/users')
const router = express.Router()

router
.get('/getusers', getAllUser)
.get('/detailUsers/:id', detailUsers)
.put('/activate/:id', updateUsers)
.delete('/deleteusers/:id', deleteUsers)

module.exports = router