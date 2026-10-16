const produtoModel = require('../models/produtoModel');

function listar(req, res) {
    res.json(produtoModel.listarTodos());
}

function buscar(req, res) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            erro: 'ID inválido.'
        });
    }

    const produto = produtoModel.buscarPorId(id);

    if (!produto) {
        return res.status(404).json({
            erro: 'Produto não encontrado.'
        });
    }

    res.json(produto);
}

function criar(req, res) {
    try {
        const resultado = produtoModel.criar(req.produtoValidado);
        const produto = produtoModel.buscarPorId(resultado.lastInsertRowid);

        res.status(201).json(produto);
    } catch (erro) {
        res.status(400).json({
            erro: 'Não foi possível cadastrar o produto.'
        });
    }
}

function atualizar(req, res) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || !produtoModel.buscarPorId(id)) {
        return res.status(404).json({
            erro: 'Produto não encontrado.'
        });
    }

    try {
        produtoModel.atualizar(id, req.produtoValidado);
        res.json(produtoModel.buscarPorId(id));
    } catch (erro) {
        res.status(400).json({
            erro: 'Não foi possível atualizar o produto.'
        });
    }
}

function excluir(req, res) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            erro: 'ID inválido.'
        });
    }

    if (!produtoModel.buscarPorId(id)) {
        return res.status(404).json({
            erro: 'Produto não encontrado.'
        });
    }

    produtoModel.excluir(id);

    res.status(200).json({
        mensagem: 'Produto excluído com sucesso.'
    });
}

module.exports = {
    listar,
    buscar,
    criar,
    atualizar,
    excluir
};
