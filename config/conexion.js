const mysql = require('mysql');
const conexion = mysql.createConnection({
    user: 'k5smvi6hogzj',
    password: 'pscale_pw_SVfzrfY3JpI31M5hpj8AieUoxrOt602uXxO8lbVpVe4',
    host: 'dxr75bqu8ovs.aws-sa-east-1-1.psdb.cloud',
    database: 'remaf',
    ssl:{}
});

conexion.connect((err)=>{
    if (err) {
        console.log('ha ocurrido un error'+ err)
    } else {
        console.log('la base de datos se conecto')
    }
});

module.exports = conexion;