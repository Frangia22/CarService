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
    return { dataRow: [serviCard] }
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
const updateServiCard = async (id, serviCardData) => {
  try {
    const serviCardExist = await ServiCar.findByPk(id)
    if (serviCardExist !== null) {
      const serviCardUpdated = await ServiCar.update(serviCardData, {
        where: {
          id
        }
      })
      return serviCardUpdated
    }
    return false
  } catch (error) {
    throw new Error(error)
  }
}
const deleteServiCard = async (req, res) => {
  try {
    const ids = req.split(',')
    const deleteCountServiCard = await ServiCar.destroy({
      where: {
        id: ids
      }
    })
    return deleteCountServiCard
  } catch (error) {
    throw new Error(error)
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
