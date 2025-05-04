const { getDb } = require('../../config/db');
const fs = require('fs');
const path = require('path');

//Verificando se o banco foi criado ou não e inicializando ele
module.exports.verificarInicializarBanco = async () => {

    try{
        
        //Verificando se há alguma estrutura ou dados no banco
        const db = await getDb();
        const [estrutura] = await db.query("SHOW tables LIKE 'clientes'");

        if(estrutura.length === 0){
            console.log('Criando a estrutura do banco...');
            await module.exports.resetarBanco();
        }

        const [dados] = await db.query('SELECT count(*) total FROM clientes');

        if(dados[0].total === 0){
            console.log('Povoando o banco...');
            await module.exports.povoarBanco();
        }

        console.log('Banco pronto!');


    }catch(err){
        console.error(`Erro no verificarInicializarBanco - modelReset: ${err}`);
        throw err;
    }

};

// Dropando e criando o banco novamente
module.exports.resetarBanco = async () => {
    
    //Obtendo o banco
    let db = await getDb();

    try{

        //Preparando as queries
        const sqlReset = `
            DROP DATABASE IF EXISTS e_commerce_books;
            CREATE DATABASE IF NOT EXISTS e_commerce_books;
            USE e_commerce_books;
        `;

        const sqlPath = path.join(__dirname, '../../../scripts/ddl.sql');
        const sqlDdl = fs.readFileSync(sqlPath, 'utf8');

        //Resetando o banco
        await db.query(sqlReset);
        await db.query(sqlDdl);

    }catch(err){
        console.error(`Erro no resetarBanco - modelReset: ${err}`);
        throw err;
    }
};

// Povoando o banco
module.exports.povoarBanco = async () => {

    //Obtendo o banco
    const db = await getDb();

    try{

        //Preparando a query
        const insertPath = path.join(__dirname, '../../../scripts/inserts.sql');
        const sqlInserts = fs.readFileSync(insertPath, 'utf8');
        
        //Resetando o banco
        await db.query(sqlInserts);

    }catch(err){
        console.error(`Erro no povoarBanco - modelReset: ${err}`);
        throw err;
    }
};

// Resetando o banco e povoando
module.exports.resetarPovoarBanco = async () => {

    try{
        await module.exports.resetarBanco();
        await module.exports.povoarBanco();
    }catch(err){
        console.error(`Erro no resetarPovoarBanco - modelReset: ${err}`);
        throw err;
    }
};


