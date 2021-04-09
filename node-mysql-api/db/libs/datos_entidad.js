'use strict'
const { v4:uuidv4 } = require('uuid')
const { Op, where } = require('sequelize')


module.exports = function setupDatosEntidad(DatosEntidadModel){


console.log('antes de la llamada al metodo')

    function listaDatosEntidad(){
        return new Promise(async(resolve, reject) => {
            console.log('entró')
            try {
                console.log('entró lib')
                await DatosEntidadModel.findAll({

                    where: { bas_Est: 1}

                }).then(result => {
                    console.log('result', result)
                    resolve(result)
                  })
                } catch (e) {
                  console.log('errorasdfafadf', e)
                  reject(e)
                }
        })
    }


    return {
        listaDatosEntidad
    }
}