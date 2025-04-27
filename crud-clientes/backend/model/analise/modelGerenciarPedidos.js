const db = require('../../config/db');

//UPDATE

//Atualizando o status de um determinado pedido
module.exports.atualizarStatusPedidoId = async (dados) => {
    
    sql = `
        update 
            vendas
            set vnd_status = ?
        where vnd_id = ?;
    `;

    const valores = [
        dados.vnd_status,
        dados.vnd_id
    ]

    try{
        const [cliente] = await db.query(sql, valores);
        return cliente;
        
    }catch(err){
        console.error(`Erro no atualizarStatusPedidoId - modelGerenciarPedidos: ${err}`);
        throw err;
    }

}

//SELECT
module.exports.buscarDevolvidosTrocados = async () => {

    const sql = `
        select
            *
        from 
            trocas t
            join clientes c on c.clt_id = t.trc_clt_id
            join livros l on l.lvr_id = trc_lvr_id;
    `;

    try{
        const [result] = await db.query(sql);
        return result;
        
    }catch(err){
        console.error(`Erro no buscarDevolvidosTrocados - modelGerenciarPedidos: ${err}`);
        throw err;
    }
};

//INSERT

//Inserindo um pedido na tabela de devoluçao e troca
module.exports.devolverTrocarProduto = async (dados) => {

    // Inserindo dados na tabela de trocas
    const sql = `
        INSERT INTO trocas (
            trc_clt_id,
            trc_lvr_id,
            trc_status,
            trc_tipo
        ) VALUES (
            ?, ?, ?, ?
        );
    `;

    // Preparando os valores que serão adicionados
    const valores = [
        dados.trc_clt_id,
        dados.trc_lvr_id,
        dados.trc_status,
        dados.trc_tipo
    ]

    // Executando a query para a inserção de dados 
    try{

        await db.query(sql, valores);

    }catch(err){
        console.error(`Erro no devolverTrocarProduto - modelGerenciarPedidos: ${err}`);
        throw err;
    }
};

