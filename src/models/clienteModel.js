const db = require('../database/database');

function criar({ nome, email, senhaHash, telefone = null, endereco = null }) {
    return db.prepare(`
        INSERT INTO clientes (nome, email, senha_hash, telefone, endereco)
        VALUES (?, ?, ?, ?, ?)
    `).run(nome, email, senhaHash, telefone, endereco);
}

function buscarPorEmail(email) {
    return db.prepare(`SELECT * FROM clientes WHERE email = ?`).get(email);
}

function buscarPorId(id) {
    return db.prepare(`
        SELECT id, nome, email, telefone, endereco, criado_em
        FROM clientes WHERE id = ?
    `).get(id);
}

module.exports = { criar, buscarPorEmail, buscarPorId };
