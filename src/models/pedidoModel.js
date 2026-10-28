const db = require('../database/database');

const finalizarCompra = db.transaction((cliente, carrinho) => {
    if (!carrinho.length) {
        throw new Error('O carrinho está vazio.');
    }

    const itens = [];
    let total = 0;

    // Conferir o estoque e os preços atuais no banco.
    for (const item of carrinho) {
        const produto = db.prepare(`
            SELECT id, nome, preco, estoque
            FROM produtos
            WHERE id = ?
        `).get(item.produto_id);

        if (!produto) {
            throw new Error('Um produto do carrinho não existe mais.');
        }

        if (
            !Number.isInteger(item.quantidade) ||
            item.quantidade < 1 ||
            produto.estoque < item.quantidade
        ) {
            throw new Error(
                `Estoque insuficiente para o produto: ${produto.nome}.`
            );
        }

        itens.push({
            produto_id: produto.id,
            quantidade: item.quantidade,
            preco_unitario: produto.preco
        });

        total += produto.preco * item.quantidade;
    }

    // Cadastrar o cliente.
    const resultadoCliente = db.prepare(`
        INSERT INTO clientes (nome, email)
        VALUES (?, ?)
    `).run(cliente.nome, cliente.email);

    // Registrar o pedido.
    const resultadoPedido = db.prepare(`
        INSERT INTO pedidos (cliente_id, total)
        VALUES (?, ?)
    `).run(resultadoCliente.lastInsertRowid, total);

    const pedidoId = resultadoPedido.lastInsertRowid;

    const inserirItem = db.prepare(`
        INSERT INTO itens_pedido
        (pedido_id, produto_id, quantidade, preco_unitario)
        VALUES (?, ?, ?, ?)
    `);

    const atualizarEstoque = db.prepare(`
        UPDATE produtos
        SET estoque = estoque - ?
        WHERE id = ? AND estoque >= ?
    `);

    // Registrar cada item e descontar o estoque.
    for (const item of itens) {
        inserirItem.run(
            pedidoId,
            item.produto_id,
            item.quantidade,
            item.preco_unitario
        );

        const atualizacao = atualizarEstoque.run(
            item.quantidade,
            item.produto_id,
            item.quantidade
        );

        if (atualizacao.changes !== 1) {
            throw new Error('Não foi possível atualizar o estoque.');
        }
    }

    return {
        id: pedidoId,
        total
    };
});

function listarTodos() {
    return db.prepare(`
        SELECT
            pedidos.id,
            pedidos.data_pedido,
            pedidos.total,
            pedidos.status,
            clientes.nome AS cliente,
            clientes.email
        FROM pedidos
        JOIN clientes
            ON pedidos.cliente_id = clientes.id
        ORDER BY pedidos.id DESC
    `).all();
}

function buscarPorId(id) {
    const pedido = db.prepare(`
        SELECT
            pedidos.*,
            clientes.nome AS cliente,
            clientes.email
        FROM pedidos
        JOIN clientes
            ON pedidos.cliente_id = clientes.id
        WHERE pedidos.id = ?
    `).get(id);

    if (!pedido) {
        return null;
    }

    pedido.itens = db.prepare(`
        SELECT
            itens_pedido.quantidade,
            itens_pedido.preco_unitario,
            produtos.nome
        FROM itens_pedido
        JOIN produtos
            ON itens_pedido.produto_id = produtos.id
        WHERE itens_pedido.pedido_id = ?
    `).all(id);

    return pedido;
}

module.exports = {
    finalizarCompra,
    listarTodos,
    buscarPorId
};
