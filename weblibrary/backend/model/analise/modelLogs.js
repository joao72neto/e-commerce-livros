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

//INSERT

//Registering logs
module.exports.registerLog = async (dados) => {

    //Setting up db
    const db = await getDb();

    //Preparing sql query
    const sql = `
        INSERT INTO log (
            log_clt_id,
            log_dataHora,
            log_usuario,
            log_operacao,
            log_desc
        ) VALUES (
            ?, NOW(), ?, ?, ?
        )
    `;

    //Preparing values to be inserted
    const valores = Object.values(dados);

    //Inserting the data into the db
    try{
        await db.query(sql, valores);
    }catch(err){
        console.error(`Erro no adicionarEstoque - modelEstoque: ${err}`);
        throw err;
    }
}