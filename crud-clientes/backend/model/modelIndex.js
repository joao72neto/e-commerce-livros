const db = require('../config/db');

//Buscando todos os livros do banco de dados
module.exports.buscarTodosLivro = async () => {
    try{
        const [livros] = await db.query('select * from livros');
        return livros;
        
    }catch(err){
        console.error(`Erro no buscarTodosLivro - modelIndex: ${err}`);
        throw err;
    }
}
