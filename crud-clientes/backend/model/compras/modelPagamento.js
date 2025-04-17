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
