const { serviCardService } = require('../services')

const helloWorld = (req, res) => {
  const saludo = serviCardService.helloWorld()
  res.send(saludo)
}
const getServiCardAll = async (req, res) => {
  try {
    const serviCards = await serviCardService.getServiCardAll(req, res)
    res.status(200).json(serviCards)
  } catch (error) {
    res.status(404).json({ error, message: 'No hay tarjetas' })
  }
}
const getServiCardById = async (req, res) => {
  try {
    const serviCardById = await serviCardService.getServiCardById(req.params.id)
    serviCardById != null
      ? res.status(200).json(serviCardById)
      : res.status(404).json({ message: 'Tarjeta no encontrada' })
  } catch (error) {
    res.status(404).json({ error, message: 'Tarjeta no encontrada' })
  }
}
const createServiCard = async (req, res) => {
  try {
    const serviCard = await serviCardService.createServiCard(req.body)
    serviCard && res.status(201).json({ message: 'Tarjeta created' })
  } catch (error) {
    res.status(400).json({ error: `Tarjeta not created ${error}` })
  }
}

module.exports = {
  helloWorld,
  getServiCardAll,
  getServiCardById,
  createServiCard
}
