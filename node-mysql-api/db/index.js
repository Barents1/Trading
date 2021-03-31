const { db } = require('../../node-mysql-config');
const setupDataBase = require('../db/libs/conexion')

/*MODELS */
const setupDataBolsaModel = require('./models/data_bolsa')
const setupRolesModel = require('./models/roles')


/* LIBS */
const setupDataBolsa = require('./libs/data_bolsa')
const setupRoles = require('./libs/roles')


/* CONFIG DATABASE */

module.exports = async function () {
    const config = {
      ...db.mainMysql,
      logging: console.log,
      query: { raw: true }
    }


  const sequelize = setupDataBase(config)

    /* CREATE MODELS */
  const DataBolsaModel = setupDataBolsaModel(config)
  const RolesModels = setupRolesModel(config)


/* CREATE LIBS */
  const DataBolsa = setupDataBolsa(DataBolsaModel)
  const Roles = setupRoles(RolesModels)


  return{
      DataBolsa,
      Roles
  }

}