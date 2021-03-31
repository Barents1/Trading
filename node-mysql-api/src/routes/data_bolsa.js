const express = require('express')
const asyncify = require('express-asyncify')
const db = require('../../db')

const api = asyncify(express.Router())
let service, DataBolsa


api.use('*', async (req, res, next) => {
    if (!service) {
      try {
        service = await db()
      } catch (e) {
        next(e)
      }
      DataBolsa = service.DataBolsa
    }
    next()
  })


  api.get('/listaDataBolsa',  async (req, res, next) => {
    let result
  
    console.log('api') 
    try { 
      await DataBolsa.listaDataBolsa().then(result => {
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