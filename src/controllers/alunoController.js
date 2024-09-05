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
        let json = { error: "", result: {} };
    
        let id = request.params.id;
    
        if (id) {
            try {
                //verificar se existe algum aluno associado ao id
                let alunoValid = await alunoService.GetAlunoByID(id);
    
                if (alunoValid.length === 0) {
                    json.error = "Aluno não encontrado";
                    response.status(404).json(json);
                } else {
                    //supondo que alunoValid[0] contém o aluno encontrado
                    const aluno = alunoValid[0];
                    json.result = {
                        id: aluno.id,
                        nome: aluno.nome,
                        telefone: aluno.telefone,
                        email: aluno.email,
                    };
                    response.status(200).json(json);
                }
            } catch (error) {
                json.error = `Erro ao buscar aluno: ${error.message}`;
                response.status(500).json(json);
            }
        } else {
            json.error = "Id do Aluno é obrigatório";
            response.status(400).json(json);
        }
    },

    //metodo para salvar um novo aluno
    saveAluno: async (request, response) => {
        let json = { error: "", result: "" }
    
        let foto = request.file.buffer;  // O buffer da imagem
        let nome = request.body.nome;
        let telefone = request.body.telefone;
        let data_nascimento = request.body.data_nascimento;
        let email = request.body.email;
        let fk_id_curso = request.body.fk_id_curso;
        
        try {
            let aluno = await alunoService.createAluno(foto, nome, telefone, email, data_nascimento, fk_id_curso);
    
            json.result = `Aluno: ${nome} cadastrado com sucesso ID: ${aluno.insertId}`;
            response.status(201).json(json);
        } catch (err) {
            json.error = `Erro ao cadastrar aluno: ${err.message}`;
            response.status(500).json(json);
        }
    }
}