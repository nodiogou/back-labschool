const { response } = require('express')
const cursoService = require('../services/CursoService')

module.exports = {

    //metodo para consultar os cursos 
    findALLTurmas: async (request, response) => {

        //declaração do objeto json que sera retornado como resposta da requisição
        let json = { error: "", result: [] }

        //invocar a função q ira consultar o BD para listar as turmas
        let cursos = await cursoService.readCursos()

        //tratamento de dados
        for (let curso of cursos) {
            json.result.push({
                id: curso.id,
                nome: curso.nome,
                quantidade: curso.quantidade
            })
        }

        response.status(200).json(json)
    },

    //Metodo para cadastrar um curso 
    saveCurso: async (request, response) => {
        let json = { error: "", result: {} }

        //receber dados via corpo da requisição para cadastrar o curso
        let nome = request.body.nomeCurso

        if (nome) {
            let curso = await cursoService.createCurso(nome)

            json.result = {
                id: curso.insertId,
                nome: nome
            }
        } else {
            json.error = "Nome do curso é obrigatorio"
        }
        response.status(201).json(json)
    },

    //metdo para atualizar um curso
    updateCurso: async (request, response) => {
        let json = { error: "", result: {} }

        //capturar o id pelo parametro da URI 
        let id = request.params.id

        //capturar o nome e quantidade do curso via corpo da requisição 
        let nome = request.body.nome
        let quantidade = request.body.quantidade

        if (id) {
            //verificar se existe algum curso associado ao id
            let cursoValid = await cursoService.findCursoById(id)

            if (cursoValid.length == 0) {
                json.error = "Curso não encontrado"
                response.status(404).json(json)
            } else {
                await cursoService.updateCurso(id, nome, quantidade)
                json.result = {
                    id: id,
                    nome: nome,
                    quantidade: quantidade
                }
                response.status(200).json(json)
            }
        } else {
            json.error = "Id do curso é obrigatorio"
            response.status(400).json(json)
        }
    },

    //metodo para deletar um curso
    deleteCurso: async (request, response) => {
        let json = { error: "", result: {} }

        let id = request.params.id

        if (id) {
            let cursoValid = await cursoService.findCursoById(id)

            if (cursoValid.lenght == 0) {
                json.error = "Curso não encontrado"
                response.status(404).json(json)
            } else {
                await cursoService.deleteCurso(id)

                json.result = `Curso ${cursoValid[0].nome} excluido com sucesso`

                response.status(200).json(json)
            }
        } else {
            json.error = "id do curso é obrigatorio"
            response.status(400).json(json)
        }
    }
}