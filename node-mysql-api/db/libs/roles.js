'use strict'
const { v4:uuidv4 } = require('uuid')
const { Op } = require('sequelize')


module.exports = function setupDataBolsa(RolesModels){

console.log('antes de la llamada al metodo')

    function listaRoles(){
        return new Promise(async(resolve, reject) => {
            console.log('entró')
            try {
                console.log('entró')
                await RolesModels.findAll().then(result => {
                    console.log('result', result)
                    resolve(result)
                  })
                } catch (e) {
                  console.log('error', e)
                  reject(e)
                }
        })
    }

    return {
        listaRoles
    }
}