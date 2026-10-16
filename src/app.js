const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const webRoutes = require('./routes/webRoutes');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(expressLayouts);
app.set('layout', 'layouts/main');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', apiRoutes);
app.use('/', webRoutes);

app.use((req, res) => {
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({
            erro: 'Endpoint não encontrado.'
        });
    }

    res.status(404).render('error', {
        titulo: 'Página não encontrada',
        mensagem: 'A página que você procura não existe.'
    });
});

app.use((erro, req, res, next) => {
    console.error(erro);

    if (req.path.startsWith('/api/')) {
        return res.status(500).json({
            erro: 'Erro interno do servidor.'
        });
    }

    res.status(500).send('Ocorreu um erro interno.');
});

if (require.main === module) {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Atlas das Artes disponível em http://localhost:${PORT}`);
    });
}

module.exports = app;
