const db = require('../../config/db');

//SELECT

//Trazendo todos os itens do carrinho
module.exports.buscarCarrinhoClienteId = async (clt_id) => {
    try{
        const [carrinho] = await db.query('select * from carrinho where crr_clt_id = ?', clt_id);
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
        const [livros] = await db.query('delete from carrinho where lvr_id = ?', lvr_id);
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
            ?, ?, ?, CURDATE(), 'adicionado'
        )
    `;

    //Tratando os valores para inserir no banco
    const valores = {
        crr_clt_id: dados.clt_id,
        crr_lvr_id: dados.lvr_id,
        crr_qtd: dados.crr_qtd
    }

    //Adicionando os dados no banco
    try{
        await db.query(sql, valores);
        res.status(201).json({msg: 'Item adicionado ao carrinho'})
    }catch(err){
        
        console.error(`Erro no adicionarCarrinho - modelCarrinho: ${err}`);
        res.status(500).json({msg: 'Erro ao adicionar item ao carrinho'});
        throw err;
    }
}


