'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupVentasModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('ventas', {
    pizzaTamaño: {
      type: Sequelize.STRING,
      allowNull: true
    },
    pizzaSabor: {
      type: Sequelize.STRING,
      allowNull: true
    },
    pizzaIngredientes: {
        type: Sequelize.STRING,
        allowNull: true
    },
    pizzaLlevarOMesa: {
      type: Sequelize.STRING,
      allowNull: true
    },
    soda: {
    type: Sequelize.STRING,
    allowNull: true
    },
    clienteNombre: {
      type: Sequelize.STRING,
      allowNull: true
    },
    clienteNitOci: {
      type: Sequelize.STRING,
      allowNull: true
    }

  })
}
