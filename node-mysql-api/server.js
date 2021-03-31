const { api } = require('../node-mysql-config');
const express = require('express');
const asyncify = require('express-asyncify');
const cors = require('cors');


const dataBolsaRoute = require('./src/routes/data_bolsa')
const RolesRoute = require('./src/routes/roles')


const app = asyncify(express())
app.use(cors());
app.use(express.json())


app.use('/bolsa', dataBolsaRoute)
app.use('/roles', RolesRoute)



app.listen(api.port, () => {
    console.log('Conexion exitosa')
    console.log(`Aplicación corriendo en el puerto ${api.port}`)
})

