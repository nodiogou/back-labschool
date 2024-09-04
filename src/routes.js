const express = require('express')
const route = express.Router()
const cors = require('cors')
const cursoController = require('./controllers/CursoController')
const alunoController = require('./controllers/alunoController')

route.options("*",cors())

//endpoint - curso
route.get('/curso', cursoController.findALLTurmas ) //ready
route.post('/curso', cursoController.saveCurso) //create
route.put('/curso/:id', cursoController.updateCurso) //update
route.delete('/curso/:id', cursoController.deleteCurso) //delete

//endpoint - aluno
route.get('/aluno', alunoController.findAllAlunos) //ready
route.get('/aluno/:id', alunoController.findAlunoById) //ready
route.delete('/aluno/:id', alunoController.deleteAluno) //delete

module.exports = route