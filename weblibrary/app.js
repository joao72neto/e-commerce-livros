//Modules
const path = require('path');
const express = require('express');
const routes = require('./backend/routes');
const { verificarInicializarBanco } = require('./backend/model/database/modelReset');

//Iniciando o express
const app = express();

app.use(express.static('./frontend/public'));

//Usando JSON no body
app.use(express.json());

//Configurando o motor de visualização
app.set('view engine', 'ejs');

//Configurando o caminho das views
app.set('views', path.join(__dirname + '/frontend/views'));

//Usando as rotas
app.use(routes);

//Rodando o servidor localmente na porta 3000
verificarInicializarBanco().then(() => {
    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000...');
    });
});

