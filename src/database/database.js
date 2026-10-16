const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const pasta = __dirname;

if (!fs.existsSync(pasta)) {
    fs.mkdirSync(pasta, { recursive: true });
}

const db = new Database(path.join(pasta, 'atlas.db'));

db.pragma('foreign_keys = ON');

db.exec(`
    CREATE TABLE IF NOT EXISTS categorias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL UNIQUE,
        descricao TEXT
    );

    CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        descricao TEXT NOT NULL,
        preco REAL NOT NULL CHECK (preco >= 0),
        imagem TEXT,
        estoque INTEGER NOT NULL DEFAULT 0 CHECK (estoque >= 0),
        categoria_id INTEGER NOT NULL,
        criado_em TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (categoria_id)
            REFERENCES categorias(id)
            ON DELETE RESTRICT
    );
`);

const inserirCategoria = db.prepare(`
    INSERT OR IGNORE INTO categorias (nome, descricao)
    VALUES (?, ?)
`);

const categorias = [
    ['Quadros e pinturas', 'Obras de arte e pinturas'],
    ['Esculturas e cerâmicas', 'Peças tridimensionais e cerâmicas'],
    ['Livros e discos', 'Livros, poemas e discos de vinil'],
    ['Fotografias e gravuras', 'Fotografias e artes impressas'],
    ['Artesanato', 'Peças artesanais de diferentes culturas'],
    ['Materiais artísticos', 'Tintas, pincéis, lápis e telas'],
    ['Instrumentos musicais', 'Instrumentos para criação musical']
];

for (const categoria of categorias) {
    inserirCategoria.run(...categoria);
}

const quantidadeProdutos = db.prepare(
    'SELECT COUNT(*) AS total FROM produtos'
).get().total;

if (quantidadeProdutos === 0) {
    const inserirProduto = db.prepare(`
        INSERT INTO produtos
        (nome, descricao, preco, imagem, estoque, categoria_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `);

    const produtosIniciais = [
        [
            'Noite Estrelada',
            'Quadro decorativo inspirado na pintura pós-impressionista.',
            189.90,
            'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600',
            5, 1
        ],
        [
            'Escultura artesanal',
            'Peça decorativa feita para valorizar ambientes.',
            129.90,
            'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600',
            3, 2
        ],
        [
            'Livro de poesia',
            'Uma coletânea para leitores apaixonados por palavras.',
            39.90,
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600',
            10, 3
        ],
        [
            'Kit de pintura',
            'Materiais para explorar novas técnicas artísticas.',
            79.90,
            'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600',
            8, 6
        ]
    ];

    const transacao = db.transaction((lista) => {
        for (const produto of lista) {
            inserirProduto.run(...produto);
        }
    });

    transacao(produtosIniciais);
}

module.exports = db;
