'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ServiCar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  ServiCar.init({
    patent: DataTypes.STRING,
    kilometers: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    engine: DataTypes.BOOLEAN,
    type_of_oil: DataTypes.STRING,
    filter_of_oil: DataTypes.BOOLEAN,
    filter_of_air: DataTypes.STRING,
    gasoline_filter: DataTypes.BOOLEAN,
    filter_of_gasoil: DataTypes.BOOLEAN,
    filter_anti_polen: DataTypes.STRING,
    plugs: DataTypes.BOOLEAN,
    box_of_velocity: DataTypes.STRING,
    timing_belt: DataTypes.BOOLEAN,
    brake_fluid: DataTypes.BOOLEAN,
    brake_pads: DataTypes.BOOLEAN,
    alignment: DataTypes.BOOLEAN,
    differential: DataTypes.BOOLEAN,
    change_engine_water: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ServiCar'
  })
  return ServiCar
}
