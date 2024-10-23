const express = require('express'); // Importa o módulo Express
const app = express(); // Cria uma instância do Express
const cors  = require('cors'); // Importa o módulo CORS para permitir requisições de diferentes origens
const crypto = require('node:crypto'); // Importa o módulo Crypto para operações criptográficas
const bcrypt = require('bcrypt'); // Importa o módulo Bcrypt para hashing de senhas
const pg = require('pg'); // Importa o módulo pg para interagir com o PostgreSQL

const { Pool } = pg; // Extrai a classe Pool do módulo pg

// Configura a conexão com o banco de dados PostgreSQL
const pool = new Pool({
    user: 'postgres', // Nome de usuário do banco de dados
    host: 'localhost', // Host do banco de dados
    database: 'ecommerce', // Nome do banco de dados
    password: '', // Senha do banco de dados
    port: 5432, // Porta do banco de dados
});

const port = 3001; // Define a porta em que o servidor irá rodar

app.use(express.json()); // Middleware para parsear requisições com JSON
app.use(cors()); // Middleware para habilitar CORS

function criptografarSenha(senha){
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(senha, salt);
}
// Define a rota POST /registro para registrar novos usuários
app.post('/registro', (req, res) => {
    /* 
        IMPLEMENTAR LÓGICA DE REGISTRO DE USUÁRIO AQUI
        - Validar dados de entrada (email e senha)
        - Hash da senha usando bcrypt
        - Inserir usuário no banco de dados
        - Retornar resposta apropriada
    */
    // const senha = req.body.senha
    // const email = req.body.email

    const {email, senha } = req.body


    const senhaCriptografada = criptografarSenha(senha);
    console.log(email,  senhaCriptografada);


    const query = "INSERT INTO usuarios (email, senha, data_registro) VALUES ($1, $2, NOW())"
    pool.query(query, [email, senhaCriptografada], (error, result) =>{
        if(error){
            console.error(error);
            return res.status(400).send('Erro ao registrar usuário');
            }
            res.status(201).send('Usuário registrado com sucesso');
    });
    });
// Define a rota POST /login para autenticar usuários
app.post('/login', (req, res) => {
    /* 
        IMPLEMENTAR LÓGICA DE LOGIN AQUI
        - Validar dados de entrada (email e senha)
        - Buscar usuário no banco de dados
        - Comparar senha com hash armazenado
        - Retornar resposta apropriada
    */
});





// Inicia o servidor na porta definida
app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`); // Loga uma mensagem indicando que o servidor está rodando
});