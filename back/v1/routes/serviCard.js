const express = require('express')
const router = express.Router()
const { serviCardController } = require('../../controllers')

router.get('/', serviCardController.helloWorld)

module.exports = router
