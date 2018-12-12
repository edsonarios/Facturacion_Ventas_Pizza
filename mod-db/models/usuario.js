'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupUsuarioModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('usuario', {
    nombre: {
      type: Sequelize.STRING,
      allowNull: true
    },
    apellidos: {
      type: Sequelize.STRING,
      allowNull: true
    },
    correo: {
      type: Sequelize.STRING,
      allowNull: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true
    },
    rol: {
      type: Sequelize.STRING,
      allowNull: true
    }

  })
}
