'use strict'
const { v4:uuidv4 } = require('uuid')
const { Op } = require('sequelize')


module.exports = function setupDataBolsa(DataBolsaModel){


    function listaDataBolsa(Id){
        
        console.log('dato en la libreria t ' + Id)
        return new Promise(async(resolve, reject) => {
            try {
                console.log('entró lib')
                let result = [];
                result = await DataBolsaModel.findAll({
                    attributes: ['tra_Id','bol_Time','bol_Valor','bas_Cod','bas_Nrefect'],
                   
                    where: { bas_Id:Id,  bol_Hora:{[Op.between]:[ restarMinutos(), obtenerHoraActual() ]}}
                }).then(result => {
                    let respuesta = []
                    for(let item of result){
                        respuesta.push({
                            idTra: item.tra_Id,
                            bolsaTime: secondsToString(item.bol_Time),
                            bolsaValor: item.bol_Valor,
                            bolsaCodigo: item.bas_Cod

                        })
                    
                    }
                    
                    console.log('result', respuesta)
                   resolve(respuesta)
                  })
                } catch (e) {
                  
                  reject(e)
                }
        })
    }


function secondsToString(seconds) {
    let hour = Math.floor(seconds / 3600);
    hour = (hour < 10)? '0' + hour : hour;
    let minute = Math.floor((seconds / 60) % 60);
    minute = (minute < 10)? '0' + minute : minute;
    let second = seconds % 60;
    second = (second < 10)? '0' + second : second;
    return hour + ':' + minute + ':' + second;
  }

  function obtenerHoraActual(){
   const  momentoActual = new Date()
   const hora = momentoActual.getHours()
   const minuto = momentoActual.getMinutes()
   const segundo = momentoActual.getSeconds()

   const horaImprimible = hora + ":" + minuto + ":" + segundo
    return horaImprimible
}


function obtenerHoramenos30m(){
    let momentoActual = new Date()
    let hora = momentoActual.getHours()
    let minuto = momentoActual.getMinutes()
    let segundo = momentoActual.getSeconds()
    let horaImprimible = hora + ":" + minuto + ":" + segundo
    return horaImprimible
}

function restarMinutos(){
    const principio = new Date();
    const final = new Date();
    let hora 
    let minuto 
    let segundos
    if(principio.getMinutes()<30){
    hora = principio.getHours()-1;
    minuto = (principio.getMinutes() - 30 + 60);
    segundos = principio.getSeconds();
    }else{
    hora = principio.getHours();
    minuto = principio.getMinutes() - 30;
    segundos = principio.getSeconds();
    }

    const horarestado = hora + ":" + minuto + ":" + segundos
    console.log(horarestado)
    return horarestado
   }

function fechaActual(){
    let hoy = new Date();
    let fecha = hoy.getDate()+ '-' +(hoy.getMonth() + 1) + '-' + hoy.getFullYear();
    console.log('fecha m' + fecha)
    return fecha
}

    return {
        listaDataBolsa,
    }
}