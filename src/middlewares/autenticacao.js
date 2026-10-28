function verificarAutenticacao(req, res, next) {
    if (req.session && req.session.administrador) {
        return next();
    }

    if (req.path.startsWith('/api/')) {
        return res.status(401).json({
            erro: 'É necessário fazer login para realizar esta operação.'
        });
    }

    return res.redirect('/admin/login');
}

module.exports = verificarAutenticacao;
