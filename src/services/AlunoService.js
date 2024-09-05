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
    },

    //metodo para cadastrar um aluno
    createAluno: (foto, nome, telefone, email, data_nascimento, fk_id_curso) => {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO aluno (foto, nome, telefone, email, data_nascimento, fk_id_curso) VALUES (?, ?, ?, ?, ?, ?)`;
            const values = [foto, nome, telefone, email, data_nascimento, fk_id_curso];
            
            database.query(sql, values, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
}
