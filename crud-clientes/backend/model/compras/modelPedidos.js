//INSERT

//Inserindo pedido na tabela de vendas do banco
module.exports.adicionarPedido = async (dados) => {

    //Preparando a query sql
    const sql = `
        
        INSERT INTO vendas (
            vnd_clt_id,
            vnd_lvr_id,
            vnd_data,
            vnd_valorTotal,
            vnd_frete
        ) VALUES (
            ?, ?, CURDATE(), ?, ?
        );

    `;

    //Pegando os valores para insert
    const valores = [
        dados.clt_id,
        dados.lvr_id,
        dados.vnd_valorTotal,
        dados.vnd_frete
    ]

    //Adicionando o pedido no banco de dados
    try{
        await db.query(sql, valores);
        return 201;
    }catch(err){
        console.error(`Erro no adicionarPedido - modelPedido: ${err}`);
        throw err;
    }
}