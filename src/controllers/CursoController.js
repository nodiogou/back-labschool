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
    }
}