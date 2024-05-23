const Express = require('express')
const app = Express()

const serviCardRoutes = require('./serviCard')

app.use('/servi-card', serviCardRoutes)

module.exports = app
