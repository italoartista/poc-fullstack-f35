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

function criptografarSenha(senha) {
    const salt = bcrypt.genSaltSync(10); // Gera um salt aleatório
    return bcrypt.hashSync(senha, salt); // Retorna a senha criptografada
}


// Define a rota POST /registro para registrar novos usuários
app.post('/registro', (req, res) => {
    const { email, senha } = req.body; // Extrai email e senha do corpo da requisição
    /* 
        IMPLEMENTAR LÓGICA DE REGISTRO DE USUÁRIO AQUI
        - Validar dados de entrada (email e senha)
        - Hash da senha usando bcrypt
        - Inserir usuário no banco de dados
        - Retornar resposta apropriada
    */
   // 
   const senhaCriptografada = criptografarSenha(senha);
//    console.log(email, senhaCriptografada);   
//    res.status(200).send('Usuário registrado com sucesso');

const query = "INSERT INTO usuarios (email, senha, data_registro) VALUES ($1, $2, NOW())"; 
// Define a query SQL para inserir um usuário no banco de dados

pool.query(query, [email, senhaCriptografada], (error, result) => {
    if (error) {
        console.error(error); // Loga o erro no console
        return res.status(400).send('Erro ao registrar o usuário');
    }
    res.status(200).send('Usuário registrado com sucesso'); // Retorna uma resposta de sucesso
});

});



// Define a rota POST /login para autenticar usuários
app.post('/login',async (req, res) => {
    const {email,senha} = req.body; // Extrai email e senha do corpo da requisição   
    
    if (!email || !senha) {
        return res.status(400).send('Email e senha são obrigatórios');
    }
    try {
        const query = ""
    }
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