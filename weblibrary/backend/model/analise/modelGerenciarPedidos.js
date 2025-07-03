const { getDb } = require('../../config/db');

//UPDATE

//Atualizando o status de um determinado pedido
module.exports.atualizarStatusPedidoId = async (dados) => {
    
    //Obtendo o banco
    const db = await getDb();

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
        await db.query(sql, valores);

        if(['Aprovado', 'Em Transporte', 'Entregue'].includes(valores[0])){
            await db.query('CALL seed_sales_history()');
        }
        
    }catch(err){
        console.error(`Erro no atualizarStatusPedidoId - modelGerenciarPedidos: ${err}`);
        throw err;
    }

}

//Adicionando a qtd que o usuário quer trocar
module.exports.atualizarQtdTrocadaPedidoId = async (dados) => {
    
    //Obtendo o banco
    const db = await getDb();

    sql = `
        update 
            vendas
            set vnd_qtd_trocada = ?
        where vnd_id = ?;
    `;

    const valores = [
        dados.vnd_qtd_trocada,
        dados.vnd_id
    ]

    try{
        const [venda] = await db.query(sql, valores);
        return venda;
        
    }catch(err){
        console.error(`Erro no atualizarQtdTrocadaPedidoId - modelGerenciarPedidos: ${err}`);
        throw err;
    }

}

//SELECT
module.exports.buscarDevolvidosTrocados = async () => {

    //Obtendo o banco
    const db = await getDb();

    const sql = `
        select
            *
        from 
            trocas t
            join clientes c on c.clt_id = t.trc_clt_id
            join livros l on l.lvr_id = t.trc_lvr_id
            join vendas v on v.vnd_id = t.trc_vnd_id
        order by
            t.trc_id;
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

    //Obtendo o banco
    const db = await getDb();

    // Inserindo dados na tabela de trocas
    const sql = `
        INSERT INTO trocas (
            trc_clt_id,
            trc_vnd_id,
            trc_lvr_id,
            trc_qtd,
            trc_preco,
            trc_tipo
        ) VALUES (
            ?, ?, ?, ?, ?, ?
        );
    `;

    // Preparando os valores que serão adicionados
    const valores = [
        dados.trc_clt_id,
        dados.trc_vnd_id,
        dados.trc_lvr_id,
        dados.trc_qtd,
        dados.trc_preco,
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

//DELETE
module.exports.deletarDevolvidoTrocado = async (vnd_id) => {
    
    //Obtendo o banco
    const db = await getDb();

    const sql = `
        delete from 
            trocas
        where trc_vnd_id = ?;
    `;

    try{
        await db.query(sql, vnd_id);
    }catch(err){
        console.error(`Erro no deletarDevolvidoTrocado - modelGerenciarPedidos ${err}`);
    }
}
