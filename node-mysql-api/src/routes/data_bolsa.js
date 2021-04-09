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


  api.get(`/listaDataBolsa/:bas_Id`,  async (req, res, next) => {
    let id = req.params.bas_Id
    const bas_Id = req.body
    let result
   
  
    console.log('api ' + id) 
    try { 
      await DataBolsa.listaDataBolsa(id).then(result => {
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


  // api.get('/listaDataBolsaall',  async (req, res, next) => {
  //   let result
  
  //   console.log('api') 
  //   try { 
  //     await DataBolsa.listaDataBolsaall().then(result => {
  //       res.send(result) 
  //     }).catch(e => {
  //       console.log(e)
  //       res.status(406).send(e)
  //     })
  //     if (result) {
  //       res.send(result)
  //     }
  //   } catch (e) {
  //     return next(e)
  //   }
  // })

  module.exports = api