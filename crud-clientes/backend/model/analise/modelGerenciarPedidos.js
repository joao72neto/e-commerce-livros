const db = require('../../config/db');


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

