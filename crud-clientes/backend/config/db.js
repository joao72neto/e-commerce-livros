const mysql = require('mysql2/promise');

let db;

module.exports.getDb = async () => {
    
    if(db) return db;

    //Criando uma pool para quando o banco não está criado 
    let poolSemBanco = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '123',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        multipleStatements: true
    });

    //Criando o banco se ele não existir
    await poolSemBanco.query('CREATE DATABASE IF NOT EXISTS e_commerce_books');
    
    // Agora sim, cria pool definitiva com o banco
    db = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '123',
        database: 'e_commerce_books',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        multipleStatements: true
    });

    return db;
}

