//Modules
const express = require('express');
const routes = require('./routes/index');

//Iniciando o express
const app = express();

app.use(express.static('./public'));
app.set('view engine', 'ejs');

//Usando as rotas
app.use(routes);

//Rodando o servidor localmente na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000...');
});