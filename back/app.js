require('dotenv').config()

const express = require('express')
const helmet = require('helmet')
const logger = require('./utils/winstonLogger')
const cors = require('cors')

// Models:
const models = require('./models')

// Rutes:
const v1Router = require('./v1/routes')

const validateEnv = require('./utils/validateEnv')

const app = express()
validateEnv.validate()

// helmet
app.use(helmet())

// Cors configuration
const whitelist = process.env.CORS.split(' ')

const corsOptions = {
  origin (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      logger.api.error('Not allowed by CORS', { origin })
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

if (process.env.ENVIRONMENT === 'production') {
  app.set('trust proxy', 1) // trust first proxy
}
app.use(express.json())
app.use(express.urlencoded(
  {
    extended: false,
    limit: '10kb',
    parameterLimit: 10
  }
))

models.sequelize.authenticate()
  .then(() => {
    logger.api.debug('Conexión con la Base de Datos: EXITOSA')
  })
  .catch((err) => {
    logger.api.error('Conexión con la Base de Datos: FALLIDA')
    logger.api.error(err)
  })

app.use('/v1', v1Router)
module.exports = app
