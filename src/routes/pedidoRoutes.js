const express = require('express');
const router = express.Router();

const controller = require('../controllers/pedidoController');

router.post('/finalizar', controller.finalizar);
router.get('/:id', controller.detalhes);

module.exports = router;
