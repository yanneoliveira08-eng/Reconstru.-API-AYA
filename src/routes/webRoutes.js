const express = require('express');
const router = express.Router();

const controller = require('../controllers/produtoController');
const validarProduto = require('../middlewares/validarProduto');

router.get('/', controller.home);
router.get('/produtos', controller.listar);
router.get('/produtos/:id', controller.detalhes);

router.get('/admin', controller.admin);

router.post('/admin/produtos', validarProduto, controller.criar);

router.post(
    '/admin/produtos/:id/editar',
    validarProduto,
    controller.atualizar
);

router.post('/admin/produtos/:id/excluir', controller.excluir);

module.exports = router;