const { response, request } = require('express')
const alunoService = require('../services/AlunoService')

module.exports = {

    //metodo para consultar os alunos
    findAllAlunos: async (request, response) => {

        //declaração do objeto json que sera retornado como resposta da requisição
        let json = { error: "", result: [] }

        //invocar a função q ira consultar o BD para listar as turmas
        let alunos = await alunoService.getAlunos()

        //tratamento de dados
        for (let aluno of alunos) {
            json.result.push({
                id: aluno.id,
                nome: aluno.nome,
                telefone: aluno.telefone,
                email: aluno.email,
            })
        }

        response.status(200).json(json)
    },

    //metodo para deletar um aluno
    deleteAluno: async (request, response) => {
        let json = { error: "", result: {} }

        let id = request.params.id

        if (id) {
            let alunoValid = await alunoService.GetAlunoByID(id)
    
            if (alunoValid.length == 0) {
                json.error = "Aluno não encontrado"
                response.status(404).json(json)
            } else {
                await alunoService.deleteAluno(id)

                json.result = `Aluno ${alunoValid[0].nome} excluido com sucesso`

                response.status(200).json(json)
            }
        } else {
            json.error = "id do Aluno é obrigatorio"
            response.status(400).json(json)
        }
    },

    //metodo consultar apenas um aluno
    findAlunoById: async (request, response) => {
        let json = { error: "", result: {} }

        let id = request.params.id

        if (id) {
            //verificar se existe algum curso associado ao id
            let alunoValid = await alunoService.GetAlunoByID(id)

            if (alunoValid.length == 0) {
                json.error = "Aluno não encontrado"
                response.status(404).json(json)
            } else {
                json.result.push = {
                    id: id,
                    nome: nome,
                    telefone: telefone,
                    email: email,
                }
            }
        } else {
            json.error = "Id do Aluno é obrigatorio"
            response.status(400).json(json)
        }
    }

}