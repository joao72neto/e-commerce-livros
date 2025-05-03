const db = require('../../config/db');
const fs = require('fs');
const path = require('path');

const teste = require('../../../../modelo-bd/inserts')


// Dropando e criando o banco novamente
module.exports.resetarBanco = async () => {
    
    try{

        //Preparando as queries
        const sqlDrop = 'DROP DATABASE IF EXISTS e_commerce_books;';
        const sqlPath = path.join(__dirname, '../../../../modelo-bd/ddl/ddl-banco-completo (up-to-date)/ddl-completo (up-to-date).sql');
        const sqlDdl = fs.readFileSync(sqlPath, 'utf8');

        //Resetando o banco
        await db.query(sqlDrop);
        await db.query(sqlDdl);

        console.log('Banco resetado com sucesso!');

    }catch(err){
        console.error(`Erro no dropDatabase - modelReset: ${err}`);
        throw err;
    }
};

// Povoando o banco
module.exports.povoarBanco = async () => {

    try{

        //Preparando a query
        const sqlInserts = path.join(__dirname, '../../../../modelo-bd/inserts/inserts.sql');

        //Resetando o banco
        await db.query(sqlInserts);

        console.log('Banco povoado com sucesso!');

    }catch(err){
        console.error(`Erro no povoarBanco - modelReset: ${err}`);
        throw err;
    }

};

// Resetando o banco e povoando
module.exports.resetarPovoarBanco = async () => {

    try{
        await this.resetarBanco();
        await this.povoarBanco();
        console.log('Banco resetado por completo com sucesso!')
    }catch(err){
        console.error(`Erro no resetarPovoarBanco - modelReset: ${err}`);
        throw err;
    }
};


