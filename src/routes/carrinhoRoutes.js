
const express = require('express');
const router = express.Router();

const controller = require('../controllers/carrinhoController');

router.get('/', controller.mostrar);

router.post('/adicionar/:id', controller.adicionar);

router.post('/remover/:id', controller.remover);

module.exports = router;
