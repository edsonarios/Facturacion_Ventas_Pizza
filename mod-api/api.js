'use strict'

const debug = require('debug')('mod:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const auth = require('express-jwt')
const guard = require('express-jwt-permissions')()
const db = require('mod-db')
//const request = require('request-promise-native')
var bodyParser = require('body-parser')

const config = require('./config')

const api = asyncify(express.Router())

//parseado a json todos los bodys
api.use(bodyParser.urlencoded({extended:false}))
api.use(bodyParser.json())

let services, Usuario, Ventas

api.use('*', async (req, res, next) => {
  if (!services) {
    debug('Connecting to database')
    try {
      services = await db(config.db)
    } catch (e) {
      return next(e)
    }
    
    Ventas = services.Ventas
    Usuario = services.Usuario
    
  }
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})

// USUARIOS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

api.post('/usuarioAdd',async (req,res)=>{
  //añade un nuevo usuario
  const params = req.body   
    
    const Objeto = await Usuario.create({
      nombre: params.nombre,
      apellidos: params.apellidos,
      correo: params.correo,
      password: params.password,
      rol: params.rol
    })
 
  res.send(Objeto)
  
})

api.post('/usuarioEdit',async (req,res)=>{
    //añade un nuevo usuario
    const params = req.body   
      
      const Objeto = await Usuario.update(params.id,{
        nombres: params.nombres,
        apellidos: params.apellidos,
        correo: params.correo,
        password: params.password,
        rol: params.rol
      })
   
    res.send(Objeto)
    
  })

  api.post('/usuarioFindOne',async (req,res)=>{
    //añade un nuevo usuario
    const params = req.body   
      
      const Objeto = await Usuario.findOne(params.id)
   
    res.send(Objeto)
    
  })
  api.post('/usuarioFindAll',async (req,res)=>{
    //añade un nuevo usuario
    
      const Objeto = await Usuario.findAll()
   
    res.send(Objeto)
    
  })
  api.post('/usuarioDeleteOne',async (req,res)=>{
    //añade un nuevo usuario
    const params = req.body

      const Objeto = await Usuario.deleteOne(params.id)
   
    res.send(Objeto)
    
  })

  api.post('/usuarioLogin', async(req, res) => {
  
    var params = req.body
    var correo = params.correo
    var pass = params.password
    Usuario.findCorreo(correo).then(function (result,err){
      if(err)
        {
          res.status(500).send({message: "error al comprobar el usuario"})
        }else{
          if(result)
          { if(pass === result.password)
            {
              res.status(200).send({result})
            }
            else{
              res.status(404).send({message: "error al introducir la contraseña"})
            }
          }
          else{
            res.status(404).send({message: "el usuario no existe"})
          }
        }
      //res.send(usu)
    })
    
  })
// VENTAS  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

api.post('/ventasAdd',async (req,res)=>{
    //añade un nuevo usuario
    const params = req.body   
      
      const Objeto = await Ventas.create(params.id,{
        pizzaTamano: params.pizzaTamano,
        pizzaSabor: params.pizzaSabor,
        pizzaIngredientes: params.pizzaIngredientes,
        pizzaLlevarOMesa: params.pizzaLlevarOMesa,
        soda: params.soda,
        clienteNombre: params.clienteNombre,
        clienteNitOci: params.clienteNitOci
      })
   
    res.send(Objeto)
    
  })
  
  api.post('/ventasEdit',async (req,res)=>{
      //añade un nuevo usuario
      const params = req.body   
        
      const Objeto = await Ventas.update(params.id,{
        pizzaTamano: params.pizzaTamano,
        pizzaSabor: params.pizzaSabor,
        pizzaIngredientes: params.pizzaIngredientes,
        pizzaLlevarOMesa: params.pizzaLlevarOMesa,
        soda: params.soda,
        clienteNombre: params.clienteNombre,
        clienteNitOci: params.clienteNitOci
      })
     
      res.send(Objeto)
      
    })
  
    api.post('/ventasFindOne',async (req,res)=>{
      //añade un nuevo usuario
      const params = req.body   
        
        const Objeto = await Ventas.findOne(params.id)
     
      res.send(Objeto)
      
    })
    api.post('/ventasFindAll',async (req,res)=>{
      //añade un nuevo usuario
      
        const Objeto = await Ventas.findAll()
     
      res.send(Objeto)
      
    })
    api.post('/ventasDeleteOne',async (req,res)=>{
      //añade un nuevo usuario
      const params = req.body
   
        const Objeto = await Ventas.deleteOne(params.id)
     
      res.send(Objeto)
      
    })

module.exports = api
