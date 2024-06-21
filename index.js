const express = require('express');
require('dotenv').config();
const { dbConection } = require('./database/config');
var cors = require('cors');

// crear el servidor de express
const app = express()

//base de datos
dbConection();

// midleware: es una funcion que se ejecuta antes de algun request o response
app.use(cors());

// Directorio public 
app.use(express.static('public')) 

// lectura y parseo del body 
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));


//escuchar peticiones en el puerto 4000
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})