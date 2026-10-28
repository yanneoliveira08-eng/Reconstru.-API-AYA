

const express = require('express');
const router = express.Router();

const controller = require('../controllers/adminPedidoController');
const verificarAutenticacao = require('../middlewares/autenticacao');

router.get('/', verificarAutenticacao, controller.listar);

module.exports = router;
