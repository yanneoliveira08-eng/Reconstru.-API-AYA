const pedidoModel = require('../models/pedidoModel');

function finalizar(req, res) {
    const nome = req.body.cliente?.trim();
    const email = req.body.email?.trim();

    if (
        !nome ||
        nome.length > 120 ||
        !email ||
        email.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
        return res.status(400).send(
            'Informe um nome e um e-mail válidos.'
        );
    }

    const carrinho = req.session.carrinho || [];

    if (!carrinho.length) {
        return res.redirect('/carrinho');
    }

    try {
        const pedido = pedidoModel.finalizarCompra(
            { nome, email },
            carrinho
        );

        req.session.carrinho = [];

        res.redirect(`/pedidos/${pedido.id}`);
    } catch (erro) {
        res.status(400).send(erro.message);
    }
}

function detalhes(req, res) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).send('ID de pedido inválido.');
    }

    const pedido = pedidoModel.buscarPorId(id);

    if (!pedido) {
        return res.status(404).render('error', {
            titulo: 'Pedido não encontrado',
            mensagem: 'Não encontramos o pedido solicitado.'
        });
    }

    res.render('pages/pedido', {
        titulo: `Pedido #${pedido.id}`,
        pedido
    });
}

module.exports = {
    finalizar,
    detalhes
};
