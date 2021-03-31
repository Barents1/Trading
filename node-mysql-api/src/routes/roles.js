const express = require('express')
const asyncify = require('express-asyncify')
const db = require('../../db')

const api = asyncify(express.Router())
let service, Roles


api.use('*', async (req, res, next) => {
    if (!service) {
      try {
        service = await db()
      } catch (e) {
        next(e)
      }
      Roles = service.Roles
    }
    next()
  })


  api.get('/listaRoles',  async (req, res, next) => {
    let result
  
    console.log('api')
    try {
      await Roles.listaRoles().then(result => {
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