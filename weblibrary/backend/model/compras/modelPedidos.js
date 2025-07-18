const { getDb } = require('../../config/db');

//INSERT

//Inserindo pedido na tabela de vendas do banco
module.exports.adicionarPedido = async (dados) => {

    //Obtendo o banco
    const db = await getDb();

    //Preparando a query sql
    const sql = `
        
        INSERT INTO vendas (
            vnd_clt_id,
            vnd_lvr_id,
            vnd_numPedido,
            vnd_data,
            vnd_valorTotal,
            vnd_frete,
            vnd_qtd
        ) VALUES (
            ?, ?, ?, NOW(), ?, ?, ?
        );

        CALL seed_sales_history();
    `;

    //Pegando os valores para insert
    const valores = [
        dados.clt_id,
        dados.lvr_id,
        dados.lvr_numPedido,
        dados.vnd_valorTotal,
        dados.vnd_frete,
        dados.vnd_qtd
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

//SELECT

//Função que pegar todos os pedidos de um cliente
module.exports.buscarPedidosClienteId = async (clt_id) => {
    
    //Obtendo o banco
    const db = await getDb();

    const sql = `
    
        select  
            *
        from 
            vendas v
            join livros l on l.lvr_id = v.vnd_lvr_id
        where
            v.vnd_clt_id = ?
        order by v.vnd_id desc
    `;
    
    try{
        const [pedidos] = await db.query(sql, clt_id);
        return pedidos;
        
    }catch(err){
        console.error(`Erro no buscarPedidosClienteId - modelPedidos: ${err}`);
        throw err;
    }
}
