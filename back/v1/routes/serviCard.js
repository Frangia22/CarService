const express = require('express')
const router = express.Router()
const { serviCardController } = require('../../controllers')
const { serviCardValidations } = require('../../helpers/validations')

router.get('/', serviCardController.getServiCardAll)
router.get('/:id', serviCardController.getServiCardById)
router.get('/hello', serviCardController.helloWorld)
router.post('/', serviCardValidations, serviCardController.createServiCard)

module.exports = router
