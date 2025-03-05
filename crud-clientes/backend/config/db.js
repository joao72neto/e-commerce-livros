const mysql = require('mysql2/promise');

//Configurando a conexão
const bd = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'e_commerce_books',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = bd;