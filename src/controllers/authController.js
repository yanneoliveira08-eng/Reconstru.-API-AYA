function mostrarLogin(req, res) {
    res.render('pages/login', {
        titulo: 'Login administrativo',
        erro: null
    });
}

function login(req, res) {
    const { usuario, senha } = req.body;

    const usuarioCorreto = process.env.ADMIN_USER;
    const senhaCorreta = process.env.ADMIN_PASSWORD;

    if (
        !usuarioCorreto ||
        !senhaCorreta ||
        usuario !== usuarioCorreto ||
        senha !== senhaCorreta
    ) {
        return res.status(401).render('pages/login', {
            titulo: 'Login administrativo',
            erro: 'Usuário ou senha incorretos.'
        });
    }

    req.session.regenerate((erro) => {
        if (erro) {
            return res.status(500).send('Não foi possível iniciar a sessão.');
        }

        req.session.administrador = true;

        req.session.save((erroSalvar) => {
            if (erroSalvar) {
                return res.status(500).send('Erro ao salvar a sessão.');
            }

            res.redirect('/admin');
        });
    });
}

function logout(req, res, next) {
    req.session.destroy((erro) => {
        if (erro) {
            return next(erro);
        }

        res.clearCookie('atlas.sid');
        res.redirect('/admin/login');
    });
}

module.exports = {
    mostrarLogin,
    login,
    logout
};
