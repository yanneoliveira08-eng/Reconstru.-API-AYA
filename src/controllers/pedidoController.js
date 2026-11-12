
const pedidoModel = require('../models/pedidoModel');

function finalizar(req, res) {
    try {
        const carrinho = req.session.carrinho || [];

        if (carrinho.length === 0) {
            return res.status(400).send('Seu carrinho está vazio.');
        }

        const pedido = pedidoModel.criar({
            produtos: carrinho
        });

        req.session.carrinho = [];

        return res.redirect(`/pedidos/${pedido.id}`);

    } catch (erro) {
        console.error('Erro ao finalizar pedido:', erro);
        return res.status(500).send(
            'Não foi possível finalizar o pedido.'
        );
    }
}

function detalhes(req, res) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).send('ID inválido.');
    }

    try {
        const pedido = pedidoModel.buscarPorId(id);

        if (!pedido) {
            return res.status(404).send('Pedido não encontrado.');
        }

        return res.render('pages/pedidoDetalhes', {
            titulo: 'Detalhes do pedido',
            pedido
        });

    } catch (erro) {
        console.error('Erro ao consultar pedido:', erro);
        return res.status(500).send(
            'Não foi possível consultar o pedido.'
        );
    }
}

module.exports = {
    finalizar,
    detalhes
};
