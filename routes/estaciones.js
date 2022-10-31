const router = require('express').Router()
const conexion = require('./../config/conexion')

const cors = require('cors')
const { json } = require('express')
// asignamos las rutas


// get estaciones 

router.get('/estaciones', (req, res) => {
    let sql = `select * from estaciones where fecha_baja = null`
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)
        }
    })
})

// add estaciones

router.put('/estaciones', (req, res) => {
    const { id } = req.params
    const { nombre, id_localidad, direccion, latitude, longitude } = req.body

    let sql = `update estaciones set
    descri_estaciones = '${nombre}',
    direccion_estaciones = '${direccion}',
    rela_localidad = '${id_localidad}',
    latitude = '${latitude}',
    longitude = '${longitude}'
    where id = '${id}'`

    conexion.query(sql, (err, rows, fields) => {
        if (err) {
            throw err
        } else {
            res.json({ status: 'Estacion modificada!' })
        }
    })
})

// update estaciones

router.post('/estaciones/', (req, res) => {
    const { nombre, id_localidad, direccion, latitude, longitude } = req.body

    let sql = `INSERT into estaciones 
    (descri_estaciones,direccion_estaciones,rela_localidad,latitude,longitude)
    VALUES (${nombre},${direccion},${id_localidad},${latitude},${longitude})`

    conexion.query(sql, (err, rows, fields) => {
        if (err) {
            throw err
        } else {
            res.json({ status: 'Estacion agregada!' })
        }
    })
})

// delete estaciones

router.delete('/estaciones/:id', (req, res) => {
    const { id } = req.params
    let sql = `UPDATE estaciones set 
    fecha_baja = null where id_estaciones = ${id}`
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json({ status: 'Estacion Eliminada' })
        }
    })
})

// get ultima medicion de la estacion

router.get('/:id', (req, res) => {
    const { id } = req.params
    let sql = `SELECT * FROM sensores,estaciones WHERE rela_estaciones=id_estaciones 
    and id_estaciones='${id}' fecha_baja = null ORDER by id_sensores DESC LIMIT 1 `
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)
        }
    })
})

// get todas las mediciones de un estacion en una fecha

router.get('/:id/:date', (req, res) => {
    const { id, date } = req.params
    let sql = `SELECT * FROM sensores,estaciones WHERE rela_estaciones=id_estaciones 
    and fecha_baja = null and id_estaciones='${id}'  
    and   date_estaciones like '%${date}%' ORDER by id_sensores DESC`
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)
        }
    })
})

// get todas las mediciones de un estacion en una fecha

router.get('/', (req, res) => {
    let sql = `SELECT
    id_estaciones as id,
    descri_estaciones as nombre,
    direccion_estaciones as direccion,
    latitude as latitud,
    longitude as longitud,
    localidades.descri_localidad as localidad,
    sensores.temperatura_sensores as temperatura,
    sensores.humedad_sensores as humedad,
	sensores.precipitacion_sensores as precipitacion,
	sensores.direcc_viento_sensores as direcc_viento,
	sensores.veloc_viento_sensores as veloc_viento,
    sensores.date_estaciones as fecha
    FROM estaciones
    INNER JOIN localidades 
    ON localidades.id_localidad = estaciones.rela_localidad
    INNER JOIN sensores 
    ON estaciones.ultima_medicion_sensores = sensores.id_sensores
    where fecha_baja = null`
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)
        }
    })
})


// -------------------
router.post('/', cors(), async function (req, res) {
    const { temp, hume, prec, dir, vel, estacion } = await req.body
    if (temp == '' || !temp) {
        res.json({ status: 'datos incompletos' })
    } else {
        let sql = `insert into sensores(temperatura_sensores,
	humedad_sensores,
	precipitacion_sensores,
	direcc_viento_sensores,
	veloc_viento_sensores,
	rela_estaciones) 
    values('${temp}'
    ,'${hume}'
    ,'${prec}'
    ,'${dir}'
    ,'${vel}'
    ,'${estacion}');`
        conexion.query(sql, (err, rows, fields, result) => {
            if (err) {
                res.json(err)
            }
            else {
                const id = rows.insertId;
                // actualizamos la ultima medicion de la tabla estaciones
                let sql = `UPDATE estaciones SET
            ultima_medicion_sensores = '${id}'
            where id_estaciones = '${estacion}';`
                conexion.query(sql, (err, rows, fields) => {
                    if (err) {
                        res.json(err)
                    }
                    else {
                        // damos de baja la medicion actual anterior

                        res.json({ status: 'Lectura del sensor agregada' })
                    }
                })
            }
        })
    }
})




module.exports = router;