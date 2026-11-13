const express = require('express');
const router = express.Router();
const controller = require('../controllers/produtoController');
const authController = require('../controllers/authController');
const validarProduto = require('../middlewares/validarProduto');
const verificarAutenticacao = require('../middlewares/autenticacao');

router.get('/', controller.home);
router.get('/produtos', controller.listar);
router.get('/produtos/:id', controller.detalhes);

router.get('/admin/login', authController.mostrarLogin);
router.post('/admin/login', authController.login);
router.post('/admin/logout', verificarAutenticacao, authController.logout);
router.get('/admin', verificarAutenticacao, controller.admin);
router.post('/admin/produtos', verificarAutenticacao, validarProduto, controller.criar);
router.post('/admin/produtos/:id/editar', verificarAutenticacao, validarProduto, controller.atualizar);
router.post('/admin/produtos/:id/excluir', verificarAutenticacao, controller.excluir);

module.exports = router;
