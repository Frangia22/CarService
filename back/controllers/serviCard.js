const { serviCardService } = require('../services')

const helloWorld = (req, res) => {
  const saludo = serviCardService.helloWorld()
  res.send(saludo)
}

module.exports = {
  helloWorld
}
