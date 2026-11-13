const express = require('express');
const router = express.Router();
const controller = require('../controllers/pedidoController');
const { verificarCliente } = require('../middlewares/autenticacao');

router.post('/finalizar', verificarCliente, controller.finalizar);
router.get('/:id', verificarCliente, controller.detalhes);

module.exports = router;
