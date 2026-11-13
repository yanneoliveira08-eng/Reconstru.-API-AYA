const express = require('express');
const router = express.Router();
const controller = require('../controllers/apiController');
const validarProduto = require('../middlewares/validarProduto');
const verificarAutenticacao = require('../middlewares/autenticacao');

router.get('/produtos', controller.listar);
router.get('/produtos/:id', controller.buscar);
router.post('/produtos', verificarAutenticacao, validarProduto, controller.criar);
router.put('/produtos/:id', verificarAutenticacao, validarProduto, controller.atualizar);
router.delete('/produtos/:id', verificarAutenticacao, controller.excluir);

module.exports = router;
