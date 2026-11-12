
const produtoModel = require('../models/produtoModel');

function listar(req, res) {
    const itens = req.session.carrinho || [];

    const total = itens.reduce((soma, item) => {
        return soma + (Number(item.preco) * Number(item.quantidade));
    }, 0);

    res.render('pages/carrinho', {
        titulo: 'Meu Carrinho',
        itens,
        total
    });
}

function adicionar(req, res) {
    const id = Number(req.params.id);
    const produto = produtoModel.buscarPorId(id);

    if (!produto) {
        return res.status(404).send('Produto não encontrado.');
    }

    if (!req.session.carrinho) {
        req.session.carrinho = [];
    }

    const quantidade = Math.max(
        1,
        parseInt(req.body.quantidade, 10) || 1
    );

    if (produto.estoque < quantidade) {
        return res.status(400).send('Estoque insuficiente.');
    }

    const item = req.session.carrinho.find(
        p => Number(p.id) === id
    );

    if (item) {
        if (item.quantidade + quantidade > produto.estoque) {
            return res.status(400).send('Estoque insuficiente.');
        }

        item.quantidade += quantidade;
    } else {
        req.session.carrinho.push({
            ...produto,
            quantidade
        });
    }

    return res.redirect('/carrinho');
}

function remover(req, res) {
    const id = Number(req.params.id);

    const itens = req.session.carrinho || [];

    req.session.carrinho = itens.filter(
        item => Number(item.id) !== id
    );

    return res.redirect('/carrinho');
}

function limpar(req, res) {
    req.session.carrinho = [];

    return res.redirect('/carrinho');
}

module.exports = {
    listar,
    adicionar,
    remover,
    limpar
};
