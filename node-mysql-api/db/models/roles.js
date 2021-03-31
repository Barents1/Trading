const Sequelize = require('sequelize')
const setupDataBase = require('../libs/conexion')

module.exports = function setupDataBolsaModel (config){
    console.log('modelo')
    const sequelize = setupDataBase(config)
    return sequelize.define('roles',{
        ROL_ID:{
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'ROL_ID'
        },
        ROL_DETA:{
            type: Sequelize.STRING,
            allowNull: false,
            field: 'ROL_DETA'
        },
        ROL_INS:{
            type: Sequelize.TINYINT,
            allowNull:false,
            field:'ROL_INS'
        },
        ROL_MOD: {
            type: Sequelize.TINYINT,
            allowNull: false,
            field: 'ROL_MOD'
        },
        ROL_ELI:{
            type: Sequelize.TINYINT,
            allowNull: false,
            field: 'ROL_ELI'
        },

        ROL_CON:{
            type: Sequelize.TINYINT,
            allowNull:false,
            field: 'ROL_CON'
        },
        ROL_EST:{
            type: Sequelize.TINYINT,
            allowNull: false,
            field: 'ROL_EST'
        }
        
    },
    {
        tableName: 'tbl_roles',
        timestamps: false
    })
}





