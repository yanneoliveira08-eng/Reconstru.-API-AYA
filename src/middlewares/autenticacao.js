function verificarAutenticacao(req, res, next) {
    if (req.session && req.session.administrador) return next();
    if (req.originalUrl.startsWith('/api/')) {
        return res.status(401).json({ erro: 'É necessário fazer login como administrador.' });
    }
    return res.redirect('/admin/login');
}

function verificarCliente(req, res, next) {
    if (req.session && req.session.cliente) return next();
    if (req.originalUrl.startsWith('/api/')) {
        return res.status(401).json({ erro: 'Faça login para continuar.' });
    }
    const destino = req.method === 'POST' ? '/carrinho' : req.originalUrl;
    return res.redirect('/cliente/login?proxima=' + encodeURIComponent(destino));
}

module.exports = verificarAutenticacao;
module.exports.verificarAutenticacao = verificarAutenticacao;
module.exports.verificarCliente = verificarCliente;
