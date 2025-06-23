const { getDb } = require('../../config/db');

//SELECT

//Getting all logs from the database
module.exports.buscarTodosLogs = async () => {
    
    //Setting up the db
    const db = await getDb();

    let sql = `
        select 
            log_dataHora,
            log_usuario,
            log_operacao,
            log_desc
        from 
            log;
    `;

    try{
        let [logs] = await db.query(sql);
        logs = logs.map(log => ({
            ...log,
            log_dataHora: new Date(log.log_dataHora).toLocaleString('pt-BR')
        }));
        
        return logs;
        
    }catch(err){
        console.error(`Erro no buscarTodosLogs - modelLogs: ${err}`);
        throw err;
    }
}