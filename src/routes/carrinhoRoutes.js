
const express = require('express');
const router = express.Router();

const controller = require('../controllers/carrinhoController');

router.get('/', controller.listar);
router.post('/adicionar/:id', controller.adicionar);
router.post('/remover/:id', controller.remover);
router.post('/limpar', controller.limpar);

module.exports = router;
