SELECT *
FROM categorias;

SELECT *
FROM produtos;

SELECT *
FROM clientes;

SELECT *
FROM pedidos;

SELECT *
FROM itens_pedido;

SELECT nome, preco, estoque
FROM produtos;

SELECT *
FROM produtos
WHERE id = 1;

SELECT nome, preco
FROM produtos
WHERE preco &lt; 100;

SELECT nome, estoque
FROM produtos
WHERE estoque = 0;

SELECT nome, preco
FROM produtos
ORDER BY preco ASC;

SELECT nome, preco
FROM produtos
ORDER BY preco DESC;

SELECT *
FROM produtos
WHERE nome LIKE '%quadro%';

SELECT
    produtos.id,
    produtos.nome AS produto,
    produtos.preco,
    produtos.estoque,
    categorias.nome AS categoria
FROM produtos
JOIN categorias
    ON produtos.categoria_id = categorias.id;
	
	SELECT
    pedidos.id AS pedido,
    clientes.nome AS cliente,
    clientes.email,
    pedidos.data_pedido,
    pedidos.total,
    pedidos.status
FROM pedidos
JOIN clientes
    ON pedidos.cliente_id = clientes.id;
SELECT
    itens_pedido.pedido_id,
    produtos.nome AS produto,
    itens_pedido.quantidade,
    itens_pedido.preco_unitario,
    itens_pedido.quantidade * itens_pedido.preco_unitario
        AS subtotal
FROM itens_pedido
JOIN produtos
    ON itens_pedido.produto_id = produtos.id;
	
	SELECT
    pedidos.id AS pedido,
    clientes.nome AS cliente,
    produtos.nome AS produto,
    itens_pedido.quantidade,
    itens_pedido.preco_unitario,
    itens_pedido.quantidade * itens_pedido.preco_unitario
        AS subtotal,
    pedidos.total,
    pedidos.status
FROM pedidos
JOIN clientes
    ON pedidos.cliente_id = clientes.id
JOIN itens_pedido
    ON pedidos.id = itens_pedido.pedido_id
JOIN produtos
    ON itens_pedido.produto_id = produtos.id;
	
	SELECT
    categorias.nome AS categoria,
    produtos.nome AS produto
FROM categorias
LEFT JOIN produtos
    ON categorias.id = produtos.categoria_id;
	

SELECT

    categorias.nome AS categoria,

    COUNT(produtos.id) AS quantidade_produtos

FROM categorias

LEFT JOIN produtos

    ON categorias.id = produtos.categoria_id

GROUP BY categorias.id, categorias.nome;