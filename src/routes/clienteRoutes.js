const express = require('express');
const router = express.Router();
const controller = require('../controllers/clienteAuthController');
const clienteController = require('../controllers/clienteController');
const { verificarCliente } = require('../middlewares/autenticacao');

router.get('/cadastro', controller.mostrarCadastro);
router.post('/cadastro', controller.cadastrar);
router.get('/login', controller.mostrarLogin);
router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.get('/pedidos', verificarCliente, clienteController.meusPedidos);

module.exports = router;
