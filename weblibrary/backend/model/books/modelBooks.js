const { getDb } = require('../../config/db');

//SELECT

//Buscando todos os livros do banco de dados
module.exports.buscarTodosLivros = async () => {
    
    //Obtendo o banco
    const db = await getDb();
    
    try{
        const [livros] = await db.query('select * from livros');
        return livros;
        
    }catch(err){
        console.error(`Erro no buscarTodosLivro - modelBooks: ${err}`);
        throw err;
    }
}

//Buscando livros por ID
module.exports.buscarLivroId = async (lvr_id) => {
    
    //Obtendo o banco
    const db = await getDb();

    try{
        const [livro] = await db.query('select * from livros where lvr_id = ?', lvr_id);
        return livro;
        
    }catch(err){
        console.error(`Erro no buscarLivroId - modelBooks: ${err}`);
        throw err;
    }
};

//Buscando livros por id + categorias
module.exports.buscarLivroCatId = async (lvr_id) => {
    
    //Obtendo o banco
    const db = await getDb();

    //Query
    const sql = `
        select
            *
        from 
            livros l
            join livros_categorias lc on lc.lvc_lvr_id = l.lvr_id
            join categoria c on lc.lvc_cat_id = c.cat_id
        where
            l.lvr_id = ?
    `;

    try{
        const [livro] = await db.query(sql, lvr_id);
        return livro;
        
    }catch(err){
        console.error(`Erro no buscarLivroCatId - modelBooks: ${err}`);
        throw err;
    }
};

