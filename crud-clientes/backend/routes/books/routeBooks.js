const express = require('express');
const router = express.Router();
const controllerBooks = require('../../controller/books/controllerBooks');

//Rotas para páginas
router.get('/books', controllerBooks.getBooks);

module.exports = router;