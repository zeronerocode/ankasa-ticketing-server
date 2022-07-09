const express = require('express')
const { getAirlanes, newAirlanes, detailAirlanes, activate, updateAirlanes, deleteAirlanes } = require('../../controller/Admin/airlanes')
const upload = require('../../middleware/multer')
const router = express.Router()

router
    .get('/getairlanes', getAirlanes)
    .post('/newairlanes', upload.single('image'), newAirlanes)
    .get('/detailairlanes/:id', detailAirlanes)
    .put('/activate/:id', activate)
    .put('/updateairlines/:id', upload.single('image'), updateAirlanes)
    .delete('/delete/:id', deleteAirlanes)
module.exports = router