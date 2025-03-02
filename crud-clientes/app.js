//Modules
const express = require('express');
const toController = require('./controller/crud-controller');

//Iniciando o express
const app = express();

app.use(express.static('./public'));
app.set('view engine', 'ejs');

//Encaminhando para os endpoints
toController(app);

//Rodando o servidor localmente na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000...');
});