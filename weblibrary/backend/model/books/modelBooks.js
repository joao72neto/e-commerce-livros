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

//Buscando o total de livros no estoque + preço
module.exports.buscarLivrosIndex = async (lvr_id) => {
    
    //Obtendo o banco
    const db = await getDb();

    //Monstando a query
    const sql = `
        select
            l.lvr_id,
            l.lvr_titulo,
            l.lvr_capa,
            p.valor_venda
        from 
            livros l
            join (
                select
                    lvr_id,
                    round(sum(((gpp_margemLucro / 100) + 1) * est_valorCompra * est_qtd) / nullif(sum(est_qtd), 0), 2) valor_venda
                from
                    vw_estoque
                group by
                    lvr_id
            ) as p on p.lvr_id = l.lvr_id;
    `;

    try{
        const [livros] = await db.query(sql, lvr_id);
        return livros;
        
    }catch(err){
        console.error(`Erro no buscarLivrosIndex - modelEstoque: ${err}`);
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

//Buscando toda as categorias de um livro
module.exports.buscarCategoriasLivroId = async (lvr_id) => {
    
    //Obtendo o banco
    const db = await getDb();

    //Query
    const sql = `
        select
            c.cat_id,
            c.cat_nome
        from 
            livros l
            join livros_categorias lc on lc.lvc_lvr_id = l.lvr_id
            join categoria c on lc.lvc_cat_id = c.cat_id
        where
            l.lvr_id = ?;
    `;

    try{
        const [livro] = await db.query(sql, lvr_id);
        return livro;
        
    }catch(err){
        console.error(`Erro no buscarCategoriasLivroId - modelBooks: ${err}`);
        throw err;
    }
};

