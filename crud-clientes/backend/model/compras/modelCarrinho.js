const db = require('../../config/db');

//SELECT

//Trazendo todos os itens do carrinho
module.exports.buscarCarrinhoClienteId = async (clt_id) => {
    try{

        const sql = `
        
            SELECT 
                *
            FROM 
                carrinho c
            JOIN 
                livros l ON l.lvr_id = c.crr_lvr_id
            WHERE 
                c.crr_clt_id = ?;
        `;

        const [carrinho] = await db.query(sql, clt_id);
        return carrinho;
        
    }catch(err){
        console.error(`Erro no buscarCarrinhoClienteId - modelCarrinho: ${err}`);
        throw err;
    }
};

//DELETE

//Removendo itens do carrinho
module.exports.removerCarrinhoId = async (lvr_id) => {
    try{
        const [livros] = await db.query('delete from carrinho where crr_lvr_id = ?', lvr_id);
        return livros;
        
    }catch(err){
        console.error(`Erro no removerCarrinhoId - modelCarrinho: ${err}`);
        throw err;
    }
}


//INSERT

//Inserindo itens no carrinho
module.exports.adicionarCarrinho = async (dados) => {

    const sql = `
        
        INSERT INTO carrinho (
            crr_clt_id,
            crr_lvr_id,
            crr_qtd,
            crr_adicao,
            crr_status
        ) VALUES (
            ?, ?, ?, NOW(), 'adicionado'
        )
    `;

    //Tratando os valores para inserir no banco
    const valores = [
        dados.clt_id,
        dados.lvr_id,
        dados.crr_qtd
    ]

    //Adicionando os dados no banco
    try{
        await db.query(sql, valores);
    }catch(err){
        console.error(`Erro no adicionarCarrinho - modelCarrinho: ${err}`);
        throw err;
    }
}


