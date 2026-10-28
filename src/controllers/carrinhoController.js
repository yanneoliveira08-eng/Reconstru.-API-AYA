
const produtoModel = require('../models/produtoModel');

// Exibe os produtos adicionados ao carrinho.
function mostrar(req, res) {
    const carrinho = req.session.carrinho || [];

    const itens = carrinho.map(item => {
        const produto = produtoModel.buscarPorId(item.produto_id);

        if (!produto) {
            return null;
        }

        return {
            ...produto,
            quantidade: item.quantidade,
            subtotal: Number(produto.preco) * item.quantidade
        };
    }).filter(Boolean);

    const total = itens.reduce(
        (soma, item) => soma + item.subtotal,
        0
    );

    res.render('pages/carrinho', {
        titulo: 'Meu carrinho',
        itens,
        total
    });
}

// Adiciona um produto ao carrinho.
function adicionar(req, res) {
    const id = Number(req.params.id);
    const quantidade = Number(req.body.quantidade || 1);

    if (
        !Number.isInteger(id) ||
        id < 1 ||
        !Number.isInteger(quantidade) ||
        quantidade < 1
    ) {
        return res.status(400).send('Produto ou quantidade inválidos.');
    }

    const produto = produtoModel.buscarPorId(id);

    if (!produto) {
        return res.status(404).send('Produto não encontrado.');
    }

    if (quantidade > produto.estoque) {
        return res.status(400).send('Quantidade indisponível em estoque.');
    }

    const carrinho = req.session.carrinho || [];

    const itemExistente = carrinho.find(
        item => item.produto_id === id
    );

    const novaQuantidade = itemExistente
        ? itemExistente.quantidade + quantidade
        : quantidade;

    if (novaQuantidade > produto.estoque) {
        return res.status(400).send('Não há estoque suficiente.');
    }

    if (itemExistente) {
        itemExistente.quantidade = novaQuantidade;
    } else {
        carrinho.push({
            produto_id: id,
            quantidade
        });
    }

    req.session.carrinho = carrinho;

    req.session.save(err => {
        if (err) {
            console.error('Erro ao salvar o carrinho:', err);
            return res.status(500).send('Não foi possível salvar o carrinho.');
        }

        res.redirect('/carrinho');
    });
}

// Remove um produto do carrinho.
function remover(req, res) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).send('ID do produto inválido.');
    }

    const carrinho = req.session.carrinho || [];

    req.session.carrinho = carrinho.filter(
        item => item.produto_id !== id
    );

    req.session.save(err => {
        if (err) {
            console.error('Erro ao atualizar o carrinho:', err);
            return res.status(500).send('Não foi possível atualizar o carrinho.');
        }

        res.redirect('/carrinho');
    });
}

module.exports = {
    mostrar,
    adicionar,
    remover
};
