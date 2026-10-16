const db = require('../database/database');

function listarTodos() {
    return db.prepare(`
        SELECT produtos.*, categorias.nome AS categoria
        FROM produtos
        JOIN categorias
            ON produtos.categoria_id = categorias.id
        ORDER BY produtos.id DESC
    `).all();
}

function buscarPorId(id) {
    return db.prepare(`
        SELECT produtos.*, categorias.nome AS categoria
        FROM produtos
        JOIN categorias
            ON produtos.categoria_id = categorias.id
        WHERE produtos.id = ?
    `).get(id);
}

function listarCategorias() {
    return db.prepare(`
        SELECT * FROM categorias ORDER BY nome
    `).all();
}

function criar(produto) {
    return db.prepare(`
        INSERT INTO produtos
        (nome, descricao, preco, imagem, estoque, categoria_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `).run(
        produto.nome,
        produto.descricao,
        produto.preco,
        produto.imagem || null,
        produto.estoque,
        produto.categoria_id
    );
}

function atualizar(id, produto) {
    return db.prepare(`
        UPDATE produtos
        SET nome = ?,
            descricao = ?,
            preco = ?,
            imagem = ?,
            estoque = ?,
            categoria_id = ?
        WHERE id = ?
    `).run(
        produto.nome,
        produto.descricao,
        produto.preco,
        produto.imagem || null,
        produto.estoque,
        produto.categoria_id,
        id
    );
}

function excluir(id) {
    return db.prepare(`
        DELETE FROM produtos WHERE id = ?
    `).run(id);
}

module.exports = {
    listarTodos,
    buscarPorId,
    listarCategorias,
    criar,
    atualizar,
    excluir
};
