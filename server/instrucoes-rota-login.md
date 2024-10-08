
## Implementação da rota de login

### Desafio 5: Criar a estrutura da rota de login

1. No arquivo `app.js`, adicione a estrutura básica da rota de login:
    ```javascript
    app.post('/login', (req, res) => {
        res.send('Rota de login funcionando!');
    });
    ```
2. Teste a rota enviando uma requisição POST para `http://localhost:3001/login`.

### Desafio 6: Validar os dados de entrada

1. Na rota `/login`, adicione a validação dos dados de entrada:
    ```javascript
    app.post('/login', (req, res) => {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).send('Email e senha são obrigatórios.');
        }

        res.send('Dados válidos!');
    });
    ```
2. Teste a validação enviando requisições com e sem os campos `email` e `senha`.

### Desafio 7: Verificar as credenciais do usuário

1. Adicione o código para verificar as credenciais do usuário:
    ```javascript
    app.post('/login', async (req, res) => {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).send('Email e senha são obrigatórios.');
        }

        try {
            const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);

            if (result.rows.length === 0) {
                return res.status(401).send('Credenciais inválidas.');
            }

            const usuario = result.rows[0];
            const senhaValida = await verificarSenha(senha, usuario.password_hash);

            if (!senhaValida) {
                return res.status(401).send('Credenciais inválidas.');
            }

            res.send('Login bem-sucedido!');
        } catch (error) {
            console.error('Erro ao verificar credenciais:', error);
            res.status(500).send('Erro ao verificar credenciais.');
        }
    });
    ```
2. Teste a verificação enviando uma requisição com um email e uma senha e verificando se o login é bem-sucedido.

### Desafio 8: Gerar token de autenticação

1. Instale o módulo `jsonwebtoken`:
    ```sh
    npm install jsonwebtoken
    ```
2. Adicione o código para gerar um token de autenticação:
    ```javascript
    const jwt = require('jsonwebtoken');
    const segredo = 'seuSegredoAqui'; // Substitua por um segredo seguro

    app.post('/login', async (req, res) => {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).send('Email e senha são obrigatórios.');
        }

        try {
            const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);

            if (result.rows.length === 0) {
                return res.status(401).send('Credenciais inválidas.');
            }

            const usuario = result.rows[0];
            const senhaValida = await verificarSenha(senha, usuario.password_hash);

            if (!senhaValida) {
                return res.status(401).send('Credenciais inválidas.');
            }

            const token = jwt.sign({ id: usuario.id, email: usuario.email }, segredo, { expiresIn: '1h' });

            res.json({ token });
        } catch (error) {
            console.error('Erro ao verificar credenciais:', error);
            res.status(500).send('Erro ao verificar credenciais.');
        }
    });
    ```
3. Teste a geração do token enviando uma requisição com um email e uma senha e verificando se o token é retornado.

## Conclusão

Agora você tem a rota de login implementada no backend do seu projeto. Esta rota permite que usuários existentes façam login no sistema, validando os dados de entrada, verificando as credenciais, e gerando um token de autenticação para sessões seguras.

### Próximos passos

Para expandir e melhorar a funcionalidade de login, considere os seguintes caminhos:

1. **Validação avançada de dados**:
    - Utilize bibliotecas como `Joi` ou `express-validator` para realizar validações mais robustas dos dados de entrada.
    - Verifique se o email fornecido é válido e se a senha atende aos critérios de segurança (por exemplo, comprimento mínimo, presença de caracteres especiais, etc.).

2. **Autorização**:
    - Adicione middleware de autorização para proteger rotas que requerem autenticação.
    - Verifique o token de autenticação em cada requisição para garantir que o usuário está autenticado.

3. **Envio de emails**:
    - Envie emails de notificação para os usuários quando eles fizerem login.
    - Utilize serviços como SendGrid, Mailgun ou Nodemailer para enviar emails.

4. **Recuperação de senha**:
    - Implemente a funcionalidade de recuperação de senha para permitir que usuários redefinam suas senhas.
    - Envie emails com links de redefinição de senha e valide os tokens de redefinição.

5. **Melhorias de segurança**:
    - Utilize técnicas como rate limiting para prevenir ataques de força bruta.
    - Implemente HTTPS para garantir a segurança das comunicações entre o cliente e o servidor.

6. **Testes automatizados**:
    - Escreva testes automatizados para garantir que a funcionalidade de login funcione corretamente.
    - Utilize frameworks de teste como Jest ou Mocha para criar testes unitários e de integração.

Seguindo esses caminhos, você poderá criar um sistema de autenticação robusto e seguro, melhorando a experiência do usuário e a segurança do seu aplicativo.

Se precisar de mais alguma coisa, estou à disposição!