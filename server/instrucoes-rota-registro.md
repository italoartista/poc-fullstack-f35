## Problema

### Contexto

Em um sistema de autenticação de usuários, é essencial permitir que novos usuários se registrem para criar uma conta. Isso geralmente envolve a coleta de informações como nome de usuário e senha, a validação desses dados, o armazenamento seguro da senha (usando hashing), e a inserção dos dados do usuário em um banco de dados.

### Requisitos

Precisamos adicionar uma rota de registro ao backend do nosso projeto. Esta rota permitirá que novos usuários se registrem no sistema. Os requisitos específicos são:

1. **Receber Dados do Usuário**: A rota deve aceitar uma requisição POST contendo os dados do usuário, como nome de usuário e senha.
2. **Validar Dados**: A rota deve validar se os dados fornecidos são válidos (por exemplo, verificar se o nome de usuário e a senha não estão vazios).
3. **Hashing da Senha**: A senha do usuário deve ser armazenada de forma segura usando hashing.
4. **Inserir no Banco de Dados**: Os dados do usuário devem ser inseridos em um banco de dados relacional (PostgreSQL).
5. **Responder Apropriadamente**: A rota deve retornar uma resposta apropriada, indicando sucesso ou falha na operação de registro.

## Explicação teórica

### O que é uma rota?

Uma rota é um endpoint (URL) definido no servidor que responde a requisições HTTP. No contexto de um servidor Express.js, uma rota é criada usando métodos como `app.get`, `app.post`, `app.put`, etc.

#### Desafio 1: Criar uma rota básica

1. Abra o arquivo `app.js` no diretório `server`.
2. Adicione uma rota básica que responde a uma requisição GET:
    ```javascript
    app.get('/test', (req, res) => {
        res.send('Rota de teste funcionando!');
    });
    ```
3. Inicie o servidor e teste a rota acessando `http://localhost:3001/test`.

### O que é um Middleware?

Middleware é uma função que tem acesso ao objeto de requisição (req), ao objeto de resposta (res) e à próxima função middleware no ciclo de requisição-resposta do aplicativo. Funções middleware podem executar as seguintes tarefas:
- Executar qualquer código.
- Fazer mudanças nos objetos de requisição e resposta.
- Encerrar o ciclo de requisição-resposta.
- Chamar a próxima função middleware na pilha.

#### Desafio 2: Criar um middleware de log

1. No arquivo `app.js`, adicione um middleware que loga todas as requisições:
    ```javascript
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.url}`);
        next();
    });
    ```
2. Teste o middleware acessando qualquer rota e verificando os logs no console.

### O que é um banco de dados (database)?

Um banco de dados é uma coleção organizada de dados, geralmente armazenados e acessados eletronicamente a partir de um sistema de computador. No nosso caso, estamos usando o PostgreSQL, um sistema de gerenciamento de banco de dados relacional.

#### Desafio 3: Conectar ao banco de dados

1. Instale o módulo `pg`:
    ```sh
    npm install pg
    ```
2. No arquivo `app.js`, adicione o código para conectar ao banco de dados:
    ```javascript
    const { Pool } = require('pg');
    const client = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'ecommerce',
        password: '',
        port: 5432,
    });

    client.connect()
        .then(() => console.log('Conectado ao banco de dados'))
        .catch(err => console.error('Erro ao conectar ao banco de dados', err));
    ```
3. Teste a conexão iniciando o servidor e verificando os logs.

### Hashing de senhas

Hashing é o processo de transformar uma entrada (ou "mensagem") de qualquer comprimento em uma saída fixa de comprimento fixo usando uma função hash. No contexto de senhas, o hashing é usado para armazenar senhas de forma segura.

#### Desafio 4: Implementar hashing de senhas

1. Instale o módulo `crypto`:
    ```sh
    npm install crypto
    ```
2. No arquivo `app.js`, adicione o código para hash de senhas:
    ```javascript
    const crypto = require('crypto');

    function hashSenha(senha) {
        return crypto.createHash('sha256').update(senha).digest('hex');
    }
    ```
3. Teste a função de hash chamando-a com uma senha de exemplo e verificando a saída.

## Implementação da rota de registro

### Desafio 5: Criar a estrutura da rota de registro

1. No arquivo `app.js`, adicione a estrutura básica da rota de registro:
    ```javascript
    app.post('/registro', (req, res) => {
        res.send('Rota de registro funcionando!');
    });
    ```
2. Teste a rota enviando uma requisição POST para `http://localhost:3001/registro`.

### Desafio 6: Validar os dados de entrada

1. Na rota `/registro`, adicione a validação dos dados de entrada:
    ```javascript
    app.post('/registro', (req, res) => {
        const { nome, senha } = req.body;

        if (!nome || !senha) {
            return res.status(400).send('Nome e senha são obrigatórios.');
        }

        res.send('Dados válidos!');
    });
    ```
2. Teste a validação enviando requisições com e sem os campos `nome` e `senha`.

### Desafio 7: Inserir o usuário no banco de dados

1. Adicione o código para inserir o usuário no banco de dados:
    ```javascript
    app.post('/registro', async (req, res) => {
        const { nome, senha } = req.body;

        if (!nome || !senha) {
            return res.status(400).send('Nome e senha são obrigatórios.');
        }

        const hashedSenha = hashSenha(senha);

        try {
            const result = await client.query(
                'INSERT INTO users (email, password_hash, created_at) VALUES ($1, $2, DEFAULT) RETURNING *',
                [nome, hashedSenha]
            );

            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            res.status(500).send('Erro ao registrar usuário.');
        }
    });
    ```
2. Teste a inserção enviando uma requisição com um nome e uma senha e verificando se o usuário foi inserido no banco de dados.

## Conclusão

Agora você tem a rota de registro implementada no backend do seu projeto. Esta rota permite que novos usuários se registrem no sistema, validando os dados de entrada, hashando a senha e armazenando as informações no banco de dados.
