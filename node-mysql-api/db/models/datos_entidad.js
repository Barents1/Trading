const Sequelize = require('sequelize')
const setupDataBase = require('../libs/conexion')

module.exports = function setupDatosEntidadModel (config){
    console.log('modelo')
    const sequelize = setupDataBase(config)
    return sequelize.define('view_base',{
        bas_Id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'bas_id'
        },
        entf_Id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'entf_id'
        },
        entf_Deta:{
            type: Sequelize.STRING,
            allowNull:false,
            field:'entf_deta'
        },
        cam_Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'cam_id'
        },
        cam_Deta:{
            type: Sequelize.STRING,
            allowNull: false,
            field: 'cam_deta'
        },

        bas_Cod:{
            type: Sequelize.STRING,
            allowNull:false,
            field: 'bas_cod'
        },
        bas_Creg:{
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'bas_creg'
        },
        bas_Pvp:{
            type: Sequelize.DECIMAL(10,2),
            allowNull: false,
            field: 'bas_pvp'
        },
        bas_Pefect:{
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'bas_pefect'
        },
        bas_Pcontac:{
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'bas_pcontac'
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
        bas_Hini:{
            type: Sequelize.TIME,
            allowNull: false,
            field: 'bas_hini'
        },
        bas_Hfin:{
            type: Sequelize.TIME,
            allowNull: false,
            field: 'bas_hfin'
        },
        bas_Pcomision:{
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'bas_pcomision'
        },
        bas_Pini:{
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'bas_pini'
        },
        bas_Est:{
            type: Sequelize.TINYINT,
            allowNull: false,
            field: 'bas_est'
        },
        
    },
    {
        freezeTableName: true,
        timestamps: false
    })
}
