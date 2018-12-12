'use strict'

const setupDatabase = require('./lib/db')


const setupVentas = require('./lib/ventas')
const setupUsuario = require('./lib/usuario')

const defaults = require('defaults')

const setupVentasModel = require('./models/ventas')
const setupUsuarioModel = require('./models/usuario')



module.exports = async function (config) {
  config = defaults(config, {
    dialect: 'sqlite',
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    query: {
      raw: true
    }
  })

  const sequelize = setupDatabase(config)

  const VentasModel = setupVentasModel(config)
  const UsuarioModel = setupUsuarioModel(config)

  UsuarioModel.hasMany(VentasModel)
  VentasModel.belongsTo(UsuarioModel, {onDelete: 'CASCADE'})

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Ventas = setupVentas(VentasModel, UsuarioModel)
  const Usuario = setupUsuario(UsuarioModel)
  

  return {
    Ventas,
    Usuario
  }
}
