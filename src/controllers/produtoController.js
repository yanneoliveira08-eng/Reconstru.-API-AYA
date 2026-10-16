const produtoModel = require('../models/produtoModel');

function home(req, res) {
    const produtos = produtoModel.listarTodos();

    res.render('pages/home', {
        titulo: 'Atlas das Artes',
        produtos: produtos.slice(0, 4)
    });
}

function listar(req, res) {
    const produtos = produtoModel.listarTodos();

    res.render('pages/produtos', {
        titulo: 'Catálogo de Arte',
        produtos
    });
}

function detalhes(req, res) {
    const id = Number(req.params.id);
    const produto = produtoModel.buscarPorId(id);

    if (!produto) {
        return res.status(404).render('error', {
            titulo: 'Produto não encontrado',
            mensagem: 'O produto que você procura não existe.'
        });
    }

    res.render('pages/detalhes', {
        titulo: produto.nome,
        produto
    });
}

function admin(req, res) {
    res.render('pages/admin', {
        titulo: 'Gerenciar produtos',
        produtos: produtoModel.listarTodos(),
        categorias: produtoModel.listarCategorias(),
        erro: null
    });
}

function criar(req, res) {
    try {
        produtoModel.criar(req.produtoValidado);
        res.redirect('/admin');
    } catch (erro) {
        res.status(400).send('Não foi possível cadastrar o produto.');
    }
}

function atualizar(req, res) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || !produtoModel.buscarPorId(id)) {
        return res.status(404).send('Produto não encontrado.');
    }

    try {
        produtoModel.atualizar(id, req.produtoValidado);
        res.redirect('/admin');
    } catch (erro) {
        res.status(400).send('Não foi possível atualizar o produto.');
    }
}

function excluir(req, res) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || !produtoModel.buscarPorId(id)) {
        return res.status(404).send('Produto não encontrado.');
    }

    produtoModel.excluir(id);
    res.redirect('/admin');
}

module.exports = {
    home,
    listar,
    detalhes,
    admin,
    criar,
    atualizar,
    excluir
};
