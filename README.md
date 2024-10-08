
## Configuração do ambiente

### Pré-requisitos

- Node.js
- npm
- PostgreSQL

### Configuração do Backend

1. Navegue até o diretório `server`:
    ```sh
    cd server
    ```
2. Instale as dependências:
    ```sh
    npm install
    ```
3. Configure o banco de dados PostgreSQL e crie a tabela de usuários:
    ```sh
    psql -U postgres -d ecommerce -f create_users_table.sql
    ```
4. Inicie o servidor:
    ```sh
    npm run dev
    ```

### Configuração do Frontend

1. Navegue até o diretório `client`:
    ```sh
    cd client
    ```
2. Instale as dependências:
    ```sh
    npm install
    ```
3. Inicie o servidor de desenvolvimento:
    ```sh
    npm run dev
    ```

## Funcionalidades

### Backend

- **Rota de Registro**: Permite que novos usuários se registrem no sistema.
- **Rota de Login**: Permite que usuários autenticados façam login no sistema.

### Frontend

- **Página de Registro**: Formulário para novos usuários se registrarem.
- **Página de Login**: Formulário para usuários existentes fazerem login.
- **Dashboard**: Área administrativa para gerenciar o sistema.

## Instruções para Implementação

### Rota de Registro

Para implementar a rota de registro, siga as instruções detalhadas no arquivo [instrucoes-rota-registro.md](server/instrucoes-rota-registro.md).

### Rota de Login

Para implementar a rota de login, siga as instruções detalhadas no arquivo [instrucoes-rota-login.md](server/instrucoes-rota-login.md).

## Testes

Para testar as rotas, você pode usar ferramentas como Postman ou Insomnia para enviar requisições HTTP ao servidor.

## Contribuição

Se você deseja contribuir para este projeto, sinta-se à vontade para abrir um pull request ou relatar um problema.

## Licença

Este projeto é licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.