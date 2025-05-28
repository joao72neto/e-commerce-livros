const express = require('express');
const router = express.Router();
const controllerBooks = require('../../controller/books/controllerBooks');

//Rotas para APIs
router.get('/api/books', controllerBooks.getBuscarTodosLivros);

//Exportando as rotas
module.exports = router;