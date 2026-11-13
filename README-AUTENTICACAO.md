# Atlas das Artes — autenticação e pedidos

## Configuração local (Windows / PowerShell)

1. Abra o terminal na pasta do projeto.
2. Instale as dependências para o seu sistema operacional:

   ```powershell
   npm install
   ```

3. Crie o arquivo `.env` a partir do exemplo:

   ```powershell
   Copy-Item .env.example .env
   ```

4. Edite o `.env` e configure `SESSION_SECRET`, `ADMIN_USER` e `ADMIN_PASSWORD` com valores próprios e fortes. Não compartilhe esse arquivo.
5. Inicie o projeto:

   ```powershell
   npm run dev
   ```

6. Acesse `http://localhost:3000`.

## Fluxos implementados

- Cliente: cadastro, login, logout e consulta dos próprios pedidos.
- Senhas de clientes armazenadas com hash bcrypt (nunca em texto puro).
- Finalização de compra exige cliente autenticado.
- Cada pedido é associado ao ID do cliente autenticado.
- Detalhes de um pedido só são exibidos ao cliente proprietário.
- Administrador: login por credenciais do `.env` e logout.
- Painel, CRUD web, CRUD de API e listagem administrativa de pedidos protegidos por sessão administrativa.
- Produtos e categorias públicos para consulta.

## Banco de dados

O projeto continua usando `src/database/atlas.db` e as tabelas existentes. A implementação usa `senha_hash` na tabela `clientes`; não apaga nem recria registros existentes.

## Testes

Execute `npm test` no Windows, após `npm install`. O diretório `node_modules` não deve ser copiado entre sistemas operacionais, pois `better-sqlite3` possui componente nativo e precisa ser instalado no próprio ambiente.

## Segurança

- Não envie `.env`, senhas ou chaves em ZIPs, commits ou repositórios.
- Como o ZIP anterior continha um `.env`, troque a senha administrativa e a chave de sessão que estavam nesse arquivo.
- Em produção, configure HTTPS e `NODE_ENV=production`; o cookie de sessão passa a usar `secure`.
