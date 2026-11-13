const bcrypt = require('bcryptjs');
const clienteModel = require('../models/clienteModel');

function mostrarCadastro(req, res) {
    res.render('pages/cadastro', { titulo: 'Criar conta', erro: null, dados: {}, proxima: req.query.proxima || '/' });
}

function cadastrar(req, res) {
    const nome = String(req.body.nome || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const senha = String(req.body.senha || '');
    const telefone = String(req.body.telefone || '').trim() || null;

    if (!nome || !email || !/^\S+@\S+\.\S+$/.test(email) || senha.length < 8) {
        return res.status(400).render('pages/cadastro', {
            titulo: 'Criar conta',
            erro: 'Informe nome e e-mail válidos. A senha deve ter pelo menos 8 caracteres.',
            dados: { nome, email, telefone }, proxima: req.body.proxima || '/'
        });
    }

    if (clienteModel.buscarPorEmail(email)) {
        return res.status(409).render('pages/cadastro', {
            titulo: 'Criar conta', erro: 'Este e-mail já está cadastrado.', dados: { nome, email, telefone }, proxima: req.body.proxima || '/'
        });
    }

    try {
        const senhaHash = bcrypt.hashSync(senha, 12);
        const resultado = clienteModel.criar({ nome, email, senhaHash, telefone });
        req.session.regenerate((erro) => {
            if (erro) return res.status(500).send('Não foi possível iniciar sua sessão.');
            req.session.cliente = { id: Number(resultado.lastInsertRowid), nome, email };
            req.session.save((erroSalvar) => {
                if (erroSalvar) return res.status(500).send('Não foi possível salvar sua sessão.');
                const destino = typeof req.body.proxima === 'string' && req.body.proxima.startsWith('/') && !req.body.proxima.startsWith('//') ? req.body.proxima : '/';
                return res.redirect(destino);
            });
        });
    } catch (erro) {
        console.error('Erro ao cadastrar cliente:', erro);
        return res.status(500).render('pages/cadastro', {
            titulo: 'Criar conta', erro: 'Não foi possível criar sua conta.', dados: { nome, email, telefone }, proxima: req.body.proxima || '/'
        });
    }
}

function mostrarLogin(req, res) {
    res.render('pages/loginCliente', { titulo: 'Entrar', erro: null, proxima: req.query.proxima || '/' });
}

function login(req, res) {
    const email = String(req.body.email || '').trim().toLowerCase();
    const senha = String(req.body.senha || '');
    const cliente = clienteModel.buscarPorEmail(email);

    if (!cliente || !bcrypt.compareSync(senha, cliente.senha_hash)) {
        return res.status(401).render('pages/loginCliente', {
            titulo: 'Entrar', erro: 'E-mail ou senha incorretos.', proxima: req.body.proxima || '/'
        });
    }

    req.session.regenerate((erro) => {
        if (erro) return res.status(500).send('Não foi possível iniciar sua sessão.');
        req.session.cliente = { id: cliente.id, nome: cliente.nome, email: cliente.email };
        req.session.save((erroSalvar) => {
            if (erroSalvar) return res.status(500).send('Não foi possível salvar sua sessão.');
            const proxima = typeof req.body.proxima === 'string' && req.body.proxima.startsWith('/') && !req.body.proxima.startsWith('//')
                ? req.body.proxima : '/';
            return res.redirect(proxima);
        });
    });
}

function logout(req, res, next) {
    req.session.destroy((erro) => {
        if (erro) return next(erro);
        res.clearCookie('atlas.sid');
        return res.redirect('/');
    });
}

module.exports = { mostrarCadastro, cadastrar, mostrarLogin, login, logout };
