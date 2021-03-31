const Sequelize = require('sequelize')
const setupDataBase = require('../libs/conexion')

module.exports = function setupDataBolsaModel (config){
    console.log('modelo')
    const sequelize = setupDataBase(config)
    return sequelize.define('view_bolsa',{
        entf_Deta:{
            type: Sequelize.STRING,
            allowNull: false,
            field: 'entf_deta'
        },
        cam_Deta:{
            type: Sequelize.STRING,
            allowNull: false,
            field: 'cam_deta'
        },
        tra_Id:{
            type: Sequelize.INTEGER,
            allowNull:false,
            primaryKey: true,
            field:'tra_id'
        },
        bas_Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'bas_id'
        },
        bas_Cod:{
            type: Sequelize.STRING,
            allowNull: false,
            field: 'bas_cod'
        },

        bas_Nrefect:{
            type: Sequelize.INTEGER,
            allowNull:false,
            field: 'bas_nrefect'
        },
        bas_Fini:{
            type: Sequelize.DATE,
            allowNull: false,
            field: 'bas_fini'
        },
        bas_Ffin:{
            type: Sequelize.DATE,
            allowNull: false,
            field: 'bas_ffin'
        },
        tra_Pvp:{
            type: Sequelize.DECIMAL(10,2),
            allowNull: false,
            field: 'tra_pvp'
        },
        bol_Time:{
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'bol_time'
        },
        bol_Efect:{
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'bol_efect'
        },
        bol_Contac:{
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'bol_contac'
        },
        bol_Valor:{
            type: Sequelize.DECIMAL(15,6),
            allowNull: false,
            field: 'bol_valor'
        },
        bas_Time:{
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'bas_time'
        },
        
    },
    {
        freezeTableName: true,
        timestamps: false
    })
}




