const pedidoModel = require('../models/pedidoModel');

function finalizar(req, res) {
    const carrinho = req.session.carrinho || [];
    if (!carrinho.length) return res.status(400).send('Seu carrinho está vazio.');
    try {
        const pedido = pedidoModel.finalizarCompra(req.session.cliente.id, carrinho);
        req.session.carrinho = [];
        return res.redirect(`/pedidos/${pedido.id}`);
    } catch (erro) {
        console.error('Erro ao finalizar pedido:', erro);
        return res.status(400).send(erro.message || 'Não foi possível finalizar o pedido.');
    }
}

function detalhes(req, res) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) return res.status(400).send('ID inválido.');
    const pedido = pedidoModel.buscarPorIdECliente(id, req.session.cliente.id);
    if (!pedido) return res.status(404).render('error', {
        titulo: 'Pedido não encontrado', mensagem: 'Este pedido não existe ou não pertence à sua conta.'
    });
    return res.render('pages/pedido', { titulo: 'Detalhes do pedido', pedido });
}

module.exports = { finalizar, detalhes };
