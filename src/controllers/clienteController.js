const pedidoModel = require('../models/pedidoModel');

function meusPedidos(req, res) {
    const pedidos = pedidoModel.listarPorCliente(req.session.cliente.id);
    return res.render('pages/meusPedidos', { titulo: 'Meus pedidos', pedidos });
}

module.exports = { meusPedidos };
