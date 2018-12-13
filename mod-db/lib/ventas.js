'use strict'

module.exports = function setupVentas (VentasModel, UsuarioModel) {
  async function create (agent) {
    

    const result = await VentasModel.create(agent)
    return result.toJSON()
  }

  async function update (id, ventas) {
    const cond = {
      where: {
        id
      }
    }
    
    const updated = await VentasModel.update(ventas, cond)
    return updated
  }

  async function findOne (id){
    return await VentasModel.findOne({
        where:{
            id
        }
    })
  }

  function findAll(){
    return VentasModel.findAll()
  }

  async function deleteOne(id){ 
    return await VentasModel.destroy({
      where:{ 
        id: id
      }
    })
  }

  return {
    create,
    update,
    findOne,
    findAll,
    deleteOne
  }
}
