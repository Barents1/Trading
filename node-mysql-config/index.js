'use strict'
const configDev = {
    db: {
        mainMysql:{
            dialect: 'mysql',
            database: 'trading',
            username: 'root',
            password: '',
            host: '172.19.10.124',
            // host: 'localhost',
            port: 3306
        },
        api: {
            secret:'n0d3',
            bsr:10,
            port:8090
        }
    }
}

module.exports = { ...configDev.db, ...configDev }
