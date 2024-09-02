const express = require('express')
const route = express.Router()
const cors = require('cors')
const cursoController = require('./controllers/CursoController')

route.options("*",cors())

//endpoint - curso
route.get('/curso', cursoController.findALLTurmas ) //ready
route.post('/curso', cursoController.saveCurso) //create

module.exports = route