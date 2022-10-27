const mysql = require('mysql');
const conexion = mysql.createConnection({
    user: 'z1p9pxr3rcfwhg4nlmef',
    password: 'pscale_pw_6ClPBcjEd3Nw4kc3IY2iASmKsMPLcANgVCJwB6Fgci2',
    host: 'aws-sa-east-1.connect.psdb.cloud',
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