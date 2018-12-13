'use strict'

module.exports = function setupUsuario (UsuarioModel) {
  async function create (agent) {
    

    const result = await UsuarioModel.create(agent)
    return result.toJSON()
  }

  async function update (id, usuario) {
    const cond = {
      where: {
        id
      }
    }
    
    const updated = await UsuarioModel.update(usuario, cond)
    return updated
  }

  async function findOne (id){
    return await UsuarioModel.findOne({
        where:{
            id
        }
    })
  }

  function findAll(){
    return UsuarioModel.findAll()
  }

  async function deleteOne(usuarioId){ 
    return await UsuarioModel.destroy({
      where:{ 
        id: usuarioId
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
