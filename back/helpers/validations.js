const { check } = require('express-validator')
const { validateResult } = require('../middleware/validations')

const serviCardValidations = [
  check('patent').notEmpty().isString().isLength({ min: 6, max: 9 }).withMessage('Patente es requerido y debe tener formato valido'),
  check('kilometers').notEmpty().isInt().isLength({ min: 2, max: 8 }).withMessage('Kilometros es requerido'),
  check('date').notEmpty().isDate().withMessage('Fecha es requerida'),
  check('engine').isBoolean().withMessage('Motor tiene que ser true o false'),
  check('type_of_oil').optional({ checkFalsy: true }).isString().isLength({ min: 3, max: 6 }).withMessage('Tipo de aceite es requerido y debe tener formato valido'),
  check('filter_of_oil').isBoolean().withMessage('Filtro de aceite tiene que ser true o false'),
  check('filter_of_air').optional({ checkFalsy: true }).isString().isLength({ min: 6, max: 9 }).withMessage('Filtro de aire es requerido y debe tener formato valido'),
  check('gasoline_filter').isBoolean().withMessage('Filtro de nafta tiene que ser true o false'),
  check('filter_of_gasoil').isBoolean().withMessage('Filtro de gasoil tiene que ser true o false'),
  check('filter_anti_polen').optional({ checkFalsy: true }).isString().isLength({ min: 6, max: 9 }).withMessage('Filtro anti-polen es requerido y debe tener formato valido'),
  check('plugs').isBoolean().withMessage('Bujias tiene que ser true o false'),
  check('box_of_velocity').optional({ checkFalsy: true }).isString().isLength({ min: 5, max: 16 }).withMessage('Caja de velocidad es requerido y debe tener formato valido'),
  check('timing_belt').isBoolean().withMessage('Correa de distribución tiene que ser true o false'),
  check('brake_fluid').isBoolean().withMessage('Liquido de freno tiene que ser true o false'),
  check('brake_pads').isBoolean().withMessage('Pastillas de freno tiene que ser true o false'),
  check('alignment').isBoolean().withMessage('Alineación tiene que ser true o false'),
  check('differential').isBoolean().withMessage('Diferencial tiene que ser true o false'),
  check('change_engine_water').isBoolean().withMessage('Reemplazo agua motro tiene que ser true o false'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = {
  serviCardValidations
}
