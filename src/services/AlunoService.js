//importação do database
const database = require('../database');

module.exports = {

    //metodo para consultar os alunos
    getAlunos: () => {
        return new Promise((resolve, reject) => {
            database.query('select * from aluno', (err, result) => {
                if (err) {
                    reject(err);
                    return
                }
                resolve(result)
            })
        })
    },

    //metodo para deletar um aluno
    deleteAluno: (id) => {
        return new Promise((resolve, reject) => {
            database.query(`DELETE FROM aluno WHERE id = ${id}`, (err, result) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(result)
            })
        })
    },

    GetAlunoByID: (id) => {
        return new Promise((resolve, reject) => {
            database.query(`SELECT * FROM aluno WHERE id = ${id}`, (err, result) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(result)
            })
        })
    }
}
