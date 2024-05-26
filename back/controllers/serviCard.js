const { serviCardService } = require('../services')

const helloWorld = (req, res) => {
  const saludo = serviCardService.helloWorld()
  res.send(saludo)
}
const createServiCard = async (req, res) => {
  try {
    const serviCard = await serviCardService.createServiCard(req.body)
    if (serviCard) {
      res.status(201).json({ message: 'Tarjeta created' })
    } else {
      res.status(400).json({ error: 'Client cuit exists' })
    }
  } catch (error) {
    res.status(400).json({ error: `Tarjeta not created ${error}` })
  }
}

module.exports = {
  helloWorld,
  createServiCard
}
