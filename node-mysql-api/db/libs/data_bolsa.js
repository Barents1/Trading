'use strict'
const { v4:uuidv4 } = require('uuid')
const { Op } = require('sequelize')


module.exports = function setupDataBolsa(DataBolsaModel){


    function listaDataBolsa(){
        return new Promise(async(resolve, reject) => {
            try {
                console.log('entró')
                let result = [];
                result = await DataBolsaModel.findAll({
                    where: { bas_Nrefect:1750 }
                }).then(result => {
                    console.log('result', result)
                    resolve(result)
                  })
                } catch (e) {
                  console.log('error', e)
                  reject(e)
                }
        })
    }
// console.log('antes de la llamada al metodo')

//     function listaDataBolsa(){
//         return new Promise(async(resolve, reject) => {
//             console.log('entró')
//             try {
//                 console.log('entró')
//                 await DataBolsaModel.findAll().then(result => {
//                     console.log('result', result)
//                     resolve(result)
//                   })
//                 } catch (e) {
//                   console.log('errorasdfafadf', e)
//                   reject(e)
//                 }
//         })
//     }

    return {
        listaDataBolsa
    }
}