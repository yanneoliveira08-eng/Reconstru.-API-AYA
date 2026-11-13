CREATE TABLE IF NOT EXISTS categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE,
    descricao TEXT
);
CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT NOT NULL,
    preco REAL NOT NULL CHECK (preco &gt;= 0),
    imagem TEXT,
    estoque INTEGER NOT NULL DEFAULT 0 CHECK (estoque &gt;= 0),
    categoria_id INTEGER NOT NULL,
    criado_em TEXT DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (categoria_id)
        REFERENCES categorias(id)
        ON DELETE RESTRICT
);
CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER NOT NULL,
    data_pedido TEXT DEFAULT CURRENT_TIMESTAMP,
    total REAL NOT NULL CHECK (total &gt;= 0),
    status TEXT NOT NULL DEFAULT 'Pendente',

    FOREIGN KEY (cliente_id)
        REFERENCES clientes(id)
        ON DELETE RESTRICT
);
CREATE TABLE IF NOT EXISTS pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER NOT NULL,
    data_pedido TEXT DEFAULT CURRENT_TIMESTAMP,
    total REAL NOT NULL CHECK (total &gt;= 0),
    status TEXT NOT NULL DEFAULT 'Pendente',

    FOREIGN KEY (cliente_id)
        REFERENCES clientes(id)
        ON DELETE RESTRICT
);
CREATE TABLE IF NOT EXISTS itens_pedido (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pedido_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,
    quantidade INTEGER NOT NULL CHECK (quantidade &gt; 0),
    preco_unitario REAL NOT NULL CHECK (preco_unitario &gt;= 0),

    FOREIGN KEY (pedido_id)
        REFERENCES pedidos(id)
        ON DELETE CASCADE,

    FOREIGN KEY (produto_id)
        REFERENCES produtos(id)
        ON DELETE RESTRICT,

    UNIQUE (pedido_id, produto_id)
);