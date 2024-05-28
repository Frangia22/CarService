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
const updateServiCard = async (req, res) => {
  try {
    const serviCardUpdated = await serviCardService.updateServiCard(req.params.id, req.body)
    serviCardUpdated > 0
      ? res.status(201).json({ message: 'Tarjeta actualizada con exito' })
      : res.status(404).json({ error: 'Tarjeta no encontrada' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
const deleteServiCard = async (req, res) => {
  try {
    const serviCardDeleteCount = await serviCardService.deleteServiCard(req.params.id)
    serviCardDeleteCount > 0
      ? res.status(200).json({ message: 'Tarjeta/s eliminadas' })
      : res.status(404).json({ error: 'Tarjeta/s no encontradas' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Tarjeta/s no eliminadas' })
  }
}

module.exports = {
  helloWorld,
  getServiCardAll,
  getServiCardById,
  createServiCard,
  updateServiCard,
  deleteServiCard
}
