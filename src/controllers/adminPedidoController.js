
const pedidoModel = require('../models/pedidoModel');

function listar(req, res) {
    try {
        const pedidos = pedidoModel.listarTodos();

        res.render('pages/adminPedidos', {
            titulo: 'Gerenciar pedidos',
            pedidos
        });
    } catch (erro) {
        console.error('Erro ao listar pedidos:', erro);

        res.status(500).render('error', {
            titulo: 'Erro interno',
            mensagem: 'Não foi possível carregar os pedidos.'
        });
    }
}

module.exports = {
    listar
};
