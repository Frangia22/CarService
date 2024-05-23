const Express = require('express')
const app = Express()

const authRoutes = require('./auth')

app.use('/auth', authRoutes)

module.exports = app
