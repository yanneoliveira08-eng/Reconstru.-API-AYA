const { test } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const app = require('../src/app');

test('GET /api/produtos deve retornar uma lista', async () => {
    const resposta = await request(app)
        .get('/api/produtos');

    assert.equal(resposta.status, 200);
    assert.ok(Array.isArray(resposta.body));
});

test('GET /api/produtos/1 deve retornar um produto existente', async () => {
    const resposta = await request(app)
        .get('/api/produtos/1');

    assert.equal(resposta.status, 200);
    assert.equal(resposta.body.id, 1);
    assert.ok(resposta.body.nome);
});

test('GET /api/produtos/999999 deve retornar 404', async () => {
    const resposta = await request(app)
        .get('/api/produtos/999999');

    assert.equal(resposta.status, 404);
    assert.equal(resposta.body.erro, 'Produto não encontrado.');
});

test('POST /api/produtos deve rejeitar dados inválidos', async () => {
    const resposta = await request(app)
        .post('/api/produtos')
        .send({
            nome: '',
            descricao: '',
            preco: -10,
            estoque: -1,
            categoria_id: 999999
        });

    assert.equal(resposta.status, 400);
    assert.ok(resposta.body.erro);
});

test('GET /api/rota-inexistente deve retornar 404', async () => {
    const resposta = await request(app)
        .get('/api/rota-inexistente');

    assert.equal(resposta.status, 404);
    assert.ok(resposta.body.erro);
});
n