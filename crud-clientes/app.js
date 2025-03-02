//Modules
const express = require('express');
const toController = require('./controller/crud-controller');

//Iniciando o express
const app = express();

//Encaminhando para os endpoints
toController(app);

//Rodando o servidor localmente na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000...');
});