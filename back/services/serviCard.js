const { getPagination, PaginateData } = require('../helpers/pagination')
const { Op } = require('sequelize')
const { ServiCar } = require('../models')
const helloWorld = (req, res) => {
  const saludo = 'Hello world!!'
  return saludo
}
const getServiCardAll = async (req, res) => {
  try {
    const { page, size, search } = req.query
    const { limit, offset } = await getPagination(page, size)
    const condition = search ? [{ patent: { [Op.substring]: `${search}` } }] : null
    const cards = await ServiCar.findAndCountAll({
      atributtes: ['id', 'patent', 'date'],
      where: condition,
      limit,
      offset,
      order: [
        ['date', 'DESC']
      ]
    })
    return await PaginateData(cards, page, limit)
  } catch (error) {
    throw new Error(error.message)
  }
}
const getServiCardById = async (id) => {
  try {
    const serviCard = await ServiCar.findByPk(id)
    return serviCard
  } catch (error) {
    throw new Error(error.message)
  }
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
  getServiCardAll,
  getServiCardById,
  createServiCard
}
