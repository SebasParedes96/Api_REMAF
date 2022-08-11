require('./config/conexion');
const express = require('express');

const port = (process.env.port || 3000)

const app = express();

//admitir tipos de datos

app.use(express.json())

// configurar puerto

app.set('port',port)

// rutas

app.use('/api',require('./rutas'))



// iniciar express
app.listen(app.get('port'),(error)=>{
    if (error) {
        console.log('error al iniciar servidor: '+ error)
    } else {
       console.log('Servidor inicado en el puerto '+port) 
    }
})