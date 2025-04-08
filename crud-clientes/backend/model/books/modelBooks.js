const db = require('../../config/db');

//SELECT

//Buscando todos os livros do banco de dados
module.exports.buscarTodosLivros = async () => {
    try{
        const [livros] = await db.query('select * from livros');
        return livros;
        
    }catch(err){
        console.error(`Erro no buscarTodosLivro - modelBooks: ${err}`);
        throw err;
    }
}


module.exports.buscarLivroId = async (lvr_id) => {
    try{
        const [livro] = await db.query('select * from livros where lvr_id = ?', lvr_id);
        return livro;
        
    }catch(err){
        console.error(`Erro no buscarLivroId - modelBooks: ${err}`);
        throw err;
    }
};
