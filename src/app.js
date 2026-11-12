
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');

const webRoutes = require('./routes/webRoutes');
const apiRoutes = require('./routes/apiRoutes');
const carrinhoRoutes = require('./routes/carrinhoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const adminPedidoRoutes = require('./routes/adminPedidoRoutes');

const app = express();

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Recebimento de dados
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sessões
app.use(session({
    secret: process.env.SESSION_SECRET || 'atlas-das-artes-chave-local',
    resave: false,
    saveUninitialized: false
}));

// Arquivos públicos
app.use(express.static(path.join(__dirname, '../public')));

// Rotas
app.use('/api', apiRoutes);
app.use('/carrinho', carrinhoRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/admin/pedidos', adminPedidoRoutes);
app.use('/', webRoutes);

// Página não encontrada
app.use((req, res) => {
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({
            erro: 'Endpoint não encontrado.'
        });
    }

    return res.status(404).render('error', {
        titulo: 'Página não encontrada',
        mensagem: 'A página que você procura não existe.'
    });
});

// Tratamento de erros
app.use((erro, req, res, next) => {
    console.error('Erro na aplicação:', erro.stack || erro);

    if (res.headersSent) {
        return next(erro);
    }

    if (req.path.startsWith('/api/')) {
        return res.status(500).json({
            erro: 'Erro interno do servidor.'
        });
    }

    return res.status(500).send(
        'Ocorreu um erro interno. Verifique o terminal.'
    );
});

// Inicialização
if (require.main === module) {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Atlas das Artes disponível em http://localhost:${PORT}`);
    });
}

module.exports = app;
