const produtoModel = require('../models/produtoModel');

function validarProduto(req, res, next) {
    const { nome, descricao, preco, estoque, categoria_id } = req.body;

    if (!nome || !nome.trim()) {
        return res.status(400).json({
            erro: 'O nome do produto é obrigatório.'
        });
    }

    if (!descricao || !descricao.trim()) {
        return res.status(400).json({
            erro: 'A descrição é obrigatória.'
        });
    }

    if (
        preco === undefined ||
        preco === '' ||
        !Number.isFinite(Number(preco)) ||
        Number(preco) < 0
    ) {
        return res.status(400).json({
            erro: 'Informe um preço válido.'
        });
    }

    if (
        estoque === undefined ||
        estoque === '' ||
        !Number.isInteger(Number(estoque)) ||
        Number(estoque) < 0
    ) {
        return res.status(400).json({
            erro: 'Informe um estoque inteiro não negativo.'
        });
    }

    const categoriaId = Number(categoria_id);

    if (
        !Number.isInteger(categoriaId) ||
        categoriaId < 1 ||
        !produtoModel.listarCategorias().some(
            categoria => categoria.id === categoriaId
        )
    ) {
        return res.status(400).json({
            erro: 'Selecione uma categoria existente.'
        });
    }

    req.produtoValidado = {
        nome: nome.trim(),
        descricao: descricao.trim(),
        preco: Number(preco),
        imagem: req.body.imagem?.trim() || null,
        estoque: Number(estoque),
        categoria_id: categoriaId
    };

    next();
}

module.exports = validarProduto;
