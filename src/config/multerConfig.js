const multer = require('multer');

//configurar o multer para armazenar os arquivos na memoria temporariamente (buffer)
const storage = multer.memoryStorage();

//criar uma instancia do multer com a configuração do storage
const upload = multer({storage: storage})

//exportar o upload
module.exports = upload;