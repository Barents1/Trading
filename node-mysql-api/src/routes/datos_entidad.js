const express = require('express')
const asyncify = require('express-asyncify')
const db = require('../../db')

const api = asyncify(express.Router())
let service, DatosEntidad


api.use('*', async (req, res, next) => {
    if (!service) {
      try {
        service = await db()
      } catch (e) {
        next(e)
      }
      DatosEntidad = service.DatosEntidad
    }
    next()
  })


  api.get('/listaDatosEntidad',  async (req, res, next) => {
    let result
  
    console.log('api') 
    try { 
      await DatosEntidad.listaDatosEntidad().then(result => {
        res.send(result) 
      }).catch(e => {
        console.log(e)
        res.status(406).send(e)
      })
      if (result) {
        res.send(result)
      }
    } catch (e) {
      return next(e)
    }
  })

  module.exports = api