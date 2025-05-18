const mysql = require('mysql2/promise');
require('dotenv').config();

//Dados de conexão com o banco
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

//Pool do banco
let db;

module.exports.getDb = async () => {
    
    if(db) return db;

    //Criando uma pool para quando o banco não está criado 
    let poolSemBanco = mysql.createPool({
        host: host,
        user: user,
        password: password,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        multipleStatements: true
    });

    //Criando o banco se ele não existir
    await poolSemBanco.query(`CREATE DATABASE IF NOT EXISTS ${database}`);

    
    // Criando uma pool definitiva com o banco
    db = mysql.createPool({
        host: host,
        user: user,
        password: password,
        database: database,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        multipleStatements: true
    });

    return db;
}

