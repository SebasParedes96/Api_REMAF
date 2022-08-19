const router = require('express').Router()
const conexion = require('./config/conexion')

// asignamos las rutas


// get estaciones 

router.get('/',(req,res)=>{
    let sql = 'select * from estaciones'
    conexion.query(sql,(err,rows,fields)=>{
        if (err) throw err;
        else {
            res.json(rows)
        }
    })
})

// -------------------

module.exports = router;