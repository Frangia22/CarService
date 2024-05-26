const { ServiCar } = require('../models')
const helloWorld = (req, res) => {
  const saludo = 'Hello world!!'
  return saludo
}
const createServiCard = async (serviCardData) => {
  try {
    const serviCard = await ServiCar.create(serviCardData)
    return serviCard
  } catch (error) {
    throw new Error(error.message)
  }
}
module.exports = {
  helloWorld,
  createServiCard
}
