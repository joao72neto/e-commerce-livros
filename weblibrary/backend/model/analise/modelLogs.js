const { getDb } = require('../../config/db');

//SELECT

//Getting all logs from the database
module.exports.buscarTodosLogs = async () => {
    
    //Setting up the db
    const db = await getDb();

    let sql = `
        select 
            * 
        from 
            log;
    `;

    try{
        const [logs] = await db.query(sql);
        return logs;
        
    }catch(err){
        console.error(`Erro no buscarTodosLogs - modelLogs: ${err}`);
        throw err;
    }
}