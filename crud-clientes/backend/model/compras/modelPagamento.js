const db = require('../../config/db');

//SELECT 

//Buscando cupons por id de cliente
module.exports.buscarCuponsClienteId = async (clt_id) => {
    try{
        const [cupons] = await db.query(`select * from cupons where cup_clt_id = ?`, clt_id);
        return cupons;

    }catch(err){
        console.error(`Erro no buscarCuponsClienteId - modelPagamento: ${err}`);
        throw err;
    }
};

//DELETE

//Deletando um cupom específico
module.exports.deletarCupomId = async (cup_id) => {
    
    const sql = 'delete from cupons where cup_id = ?';

    try{
        const [cupons] = await db.query(sql, cup_id);
        return cupons;
        
    }catch(err){
        console.error(`Erro no deletarCupomId - modelPagamento: ${err}`);
        throw err;
    }
};