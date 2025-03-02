let express = require('express');

app = express();

app.get('/', (req, res) => {
    res.end('Hello World!');
})

app.listen(3000, 'localhost');
console.log('Servidor rodando na porta 3000...')