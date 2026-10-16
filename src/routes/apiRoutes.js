const express = require('express');
const router = express.Router();

const controller = require('../controllers/apiController');
const validarProduto = require('../middlewares/validarProduto');

router.get('/produtos', controller.listar);
router.get('/produtos/:id', controller.buscar);

router.post('/produtos', validarProduto, controller.criar);

router.put('/produtos/:id', validarProduto, controller.atualizar);

router.delete('/produtos/:id', controller.excluir);

module.exports = router;
