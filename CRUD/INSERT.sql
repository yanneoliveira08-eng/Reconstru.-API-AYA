INSERT OR IGNORE INTO categorias (nome, descricao)
VALUES
    ('Quadros e pinturas', 'Obras de arte e pinturas'),
    ('Esculturas e cerâmicas', 'Peças tridimensionais e cerâmicas'),
    ('Livros e discos', 'Livros, poemas e discos de vinil'),
    ('Fotografias e gravuras', 'Fotografias e artes impressas'),
    ('Artesanato', 'Peças artesanais de diferentes culturas'),
    ('Materiais artísticos', 'Tintas, pincéis, lápis e telas'),
    ('Instrumentos musicais', 'Instrumentos para criação musical');
	
	INSERT INTO produtos (
    nome,
    descricao,
    preco,
    imagem,
    estoque,
    categoria_id
)
VALUES (
    'Quadro abstrato',
    'Quadro decorativo para ambientes.',
    150.00,
    'quadro.jpg',
    5,
    1
);

INSERT INTO produtos (
    nome,
    descricao,
    preco,
    imagem,
    estoque,
    categoria_id
)
VALUES (
    'Quadro abstrato',
    'Quadro decorativo para ambientes.',
    150.00,
    'quadro.jpg',
    5,
    (
        SELECT id
        FROM categorias
        WHERE nome = 'Quadros e pinturas'
    )
);

INSERT INTO clientes (nome, email)
VALUES ('Ana Lima', 'ana@example.com');

INSERT INTO pedidos (cliente_id, total, status)
VALUES (1, 150.00, 'Pendente');

INSERT INTO itens_pedido (
    pedido_id,
    produto_id,
    quantidade,
    preco_unitario
)
VALUES (1, 1, 1, 150.00);