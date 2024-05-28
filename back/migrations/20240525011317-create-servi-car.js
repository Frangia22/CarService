'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ServiCars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patent: {
        type: Sequelize.STRING
      },
      kilometers: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATEONLY
      },
      engine: {
        type: Sequelize.BOOLEAN
      },
      type_of_oil: {
        type: Sequelize.STRING
      },
      filter_of_oil: {
        type: Sequelize.BOOLEAN
      },
      filter_of_air: {
        type: Sequelize.STRING
      },
      gasoline_filter: {
        type: Sequelize.BOOLEAN
      },
      filter_of_gasoil: {
        type: Sequelize.BOOLEAN
      },
      filter_anti_polen: {
        type: Sequelize.STRING
      },
      plugs: {
        type: Sequelize.BOOLEAN
      },
      box_of_velocity: {
        type: Sequelize.STRING
      },
      timing_belt: {
        type: Sequelize.BOOLEAN
      },
      brake_fluid: {
        type: Sequelize.BOOLEAN
      },
      brake_pads: {
        type: Sequelize.BOOLEAN
      },
      alignment: {
        type: Sequelize.BOOLEAN
      },
      differential: {
        type: Sequelize.BOOLEAN
      },
      change_engine_water: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('ServiCars')
  }
}
