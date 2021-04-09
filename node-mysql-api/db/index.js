const { db } = require('../../node-mysql-config');
const setupDataBase = require('../db/libs/conexion')

/*MODELS */
const setupDataBolsaModel = require('./models/data_bolsa')
const setupDatosEntidadModel = require('./models/datos_entidad')
const setupRolesModel = require('./models/roles')



/* LIBS */
const setupDataBolsa = require('./libs/data_bolsa')
const setupRoles = require('./libs/roles')
const setupDatosEntidad = require('./libs/datos_entidad')


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
  const DatosEntidadModel = setupDatosEntidadModel(config)


/* CREATE LIBS */
  const DataBolsa = setupDataBolsa(DataBolsaModel)
  const Roles = setupRoles(RolesModels)
  const DatosEntidad = setupDatosEntidad(DatosEntidadModel)


  return{
      DataBolsa,
      Roles,
      DatosEntidad
  }

}

