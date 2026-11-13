-- Produtos demonstrativos adicionais do Atlas das Artes.
-- Execute somente se desejar acrescentar estes itens ao banco já existente.
-- Não altera tabelas, contas de clientes, administradores ou pedidos.

INSERT INTO produtos (nome, descricao, preco, imagem, estoque, categoria_id)
SELECT 'Maré em Azul', 'Composição abstrata em tons oceânicos para trazer serenidade à decoração.', 219.90, 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=900&q=85', 4, 1
WHERE NOT EXISTS (SELECT 1 FROM produtos WHERE nome = 'Maré em Azul');

INSERT INTO produtos (nome, descricao, preco, imagem, estoque, categoria_id)
SELECT 'Vaso Orgânico Terracota', 'Peça decorativa de formas orgânicas, inspirada na cerâmica artesanal.', 98.00, 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=900&q=85', 6, 2
WHERE NOT EXISTS (SELECT 1 FROM produtos WHERE nome = 'Vaso Orgânico Terracota');

INSERT INTO produtos (nome, descricao, preco, imagem, estoque, categoria_id)
SELECT 'Caderno de Ideias', 'Um espaço especial para registrar projetos, desenhos e pensamentos.', 32.90, 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=900&q=85', 12, 3
WHERE NOT EXISTS (SELECT 1 FROM produtos WHERE nome = 'Caderno de Ideias');

INSERT INTO produtos (nome, descricao, preco, imagem, estoque, categoria_id)
SELECT 'Fotografia Costa Serena', 'Fotografia artística que celebra a luz e a tranquilidade do litoral.', 145.00, 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=85', 3, 4
WHERE NOT EXISTS (SELECT 1 FROM produtos WHERE nome = 'Fotografia Costa Serena');

INSERT INTO produtos (nome, descricao, preco, imagem, estoque, categoria_id)
SELECT 'Peças Artesanais em Cerâmica', 'Conjunto decorativo com acabamento artesanal e personalidade única.', 76.50, 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=900&q=85', 7, 5
WHERE NOT EXISTS (SELECT 1 FROM produtos WHERE nome = 'Peças Artesanais em Cerâmica');

INSERT INTO produtos (nome, descricao, preco, imagem, estoque, categoria_id)
SELECT 'Kit Aquarela Essencial', 'Seleção de materiais para explorar cores, transparências e novas técnicas.', 89.90, 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&q=85', 9, 6
WHERE NOT EXISTS (SELECT 1 FROM produtos WHERE nome = 'Kit Aquarela Essencial');

INSERT INTO produtos (nome, descricao, preco, imagem, estoque, categoria_id)
SELECT 'Ukulele Acústico', 'Instrumento compacto para descobrir melodias e experimentar a criação musical.', 249.00, 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=900&q=85', 2, 7
WHERE NOT EXISTS (SELECT 1 FROM produtos WHERE nome = 'Ukulele Acústico');

INSERT INTO produtos (nome, descricao, preco, imagem, estoque, categoria_id)
SELECT 'Gravura Botânica', 'Arte impressa inspirada em formas naturais para compor ambientes delicados.', 64.90, 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=900&q=85', 5, 4
WHERE NOT EXISTS (SELECT 1 FROM produtos WHERE nome = 'Gravura Botânica');
