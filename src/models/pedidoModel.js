const db = require('../database/database');

const finalizarCompra = db.transaction((clienteId, carrinho) => {
    if (!Number.isInteger(Number(clienteId)) || !carrinho.length) {
        throw new Error('Cliente ou carrinho inválido.');
    }

    const cliente = db.prepare('SELECT id FROM clientes WHERE id = ?').get(clienteId);
    if (!cliente) throw new Error('Cliente não encontrado.');

    const itens = [];
    let total = 0;
    for (const item of carrinho) {
        const produtoId = Number(item.id ?? item.produto_id);
        const quantidade = Number(item.quantidade);
        const produto = db.prepare(`SELECT id, nome, preco, estoque FROM produtos WHERE id = ?`).get(produtoId);
        if (!produto) throw new Error('Um produto do carrinho não existe mais.');
        if (!Number.isInteger(quantidade) || quantidade < 1 || produto.estoque < quantidade) {
            throw new Error(`Estoque insuficiente para o produto: ${produto.nome}.`);
        }
        itens.push({ produto_id: produto.id, quantidade, preco_unitario: produto.preco });
        total += produto.preco * quantidade;
    }

    const resultadoPedido = db.prepare(`INSERT INTO pedidos (cliente_id, total) VALUES (?, ?)`).run(clienteId, total);
    const pedidoId = Number(resultadoPedido.lastInsertRowid);
    const inserirItem = db.prepare(`INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)`);
    const atualizarEstoque = db.prepare(`UPDATE produtos SET estoque = estoque - ? WHERE id = ? AND estoque >= ?`);

    for (const item of itens) {
        inserirItem.run(pedidoId, item.produto_id, item.quantidade, item.preco_unitario);
        const atualizacao = atualizarEstoque.run(item.quantidade, item.produto_id, item.quantidade);
        if (atualizacao.changes !== 1) throw new Error('Não foi possível atualizar o estoque.');
    }
    return { id: pedidoId, total };
});

function listarTodos() {
    return db.prepare(`
        SELECT pedidos.id, pedidos.data_pedido, pedidos.total, pedidos.status,
               clientes.nome AS cliente_nome, clientes.email AS cliente_email
        FROM pedidos JOIN clientes ON pedidos.cliente_id = clientes.id
        ORDER BY pedidos.id DESC
    `).all();
}

function listarPorCliente(clienteId) {
    return db.prepare(`SELECT id, data_pedido, total, status FROM pedidos WHERE cliente_id = ? ORDER BY id DESC`).all(clienteId);
}

function buscarPorId(id) {
    const pedido = db.prepare(`
        SELECT pedidos.*, clientes.nome AS cliente, clientes.email
        FROM pedidos JOIN clientes ON pedidos.cliente_id = clientes.id
        WHERE pedidos.id = ?
    `).get(id);
    if (!pedido) return null;
    pedido.itens = db.prepare(`
        SELECT itens_pedido.quantidade, itens_pedido.preco_unitario, produtos.nome
        FROM itens_pedido JOIN produtos ON itens_pedido.produto_id = produtos.id
        WHERE itens_pedido.pedido_id = ?
    `).all(id);
    return pedido;
}

function buscarPorIdECliente(id, clienteId) {
    const pedido = buscarPorId(id);
    return pedido && Number(pedido.cliente_id) === Number(clienteId) ? pedido : null;
}

module.exports = { finalizarCompra, listarTodos, listarPorCliente, buscarPorId, buscarPorIdECliente };
