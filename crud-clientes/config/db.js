const mysql = require('mysql2/promise');

//Configurando a conexão
const bd = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'e_commerce_books'
});

module.exports = bd;