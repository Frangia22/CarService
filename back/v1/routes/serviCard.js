const express = require('express')
const router = express.Router()
const { serviCardController } = require('../../controllers')

router.get('/hello', serviCardController.helloWorld)
router.post('/', serviCardController.createServiCard)

module.exports = router
