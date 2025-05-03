const db = require('../../config/db');


// Inserindo todos os dados no banco de dados
module.exports.povoarBanco = async () => {
    
    const sql = 'drop database e_commerce_books;';
    
    try{
        await db.query(sql);

    }catch(err){
        console.error(`Erro no dropDatabase - modelReset: ${err}`);
        throw err;
    }
};