//importação do database
const database = require('../database');

module.exports = {
    //metodo para consultar os cursos
    readCursos: () => {
        return new Promise((resolve,reject) => {
            database.query('select * from curso', (err, res) => {
                if (err) {
                    reject(err);
                    return
                }
            })
        })
    }
}