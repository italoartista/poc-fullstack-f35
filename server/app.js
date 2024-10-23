const express = require('express');
const app = express(); 
const cors  = require('cors');
const crypto = require('node:crypto');
const pg = require('pg');
const bcrypt = require('bcrypt')

const { Pool } = pg;


const client = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ecommerce',
    password: '',
    port: 5432,
  });   

const port = 3003;


app.use(express.json());
app.use(cors());

app.post('/registro', (req, res) => {
  const {email, senha} = req.body

  console.log(email, senha)

  const hashedPassword = bcrypt.hashSync(senha, 10);
console.log(hashedPassword)

const query = "Insert into users (email, password_hash, created_at) VALUES ($1, $2, NOW())";
 client.query(query, [email, hashedPassword], (error, result) => {
if(error) {
  console.log(error);
  return res.status(400).send('Erro ao registrar usuário');
  }
  res.status(201).send('Usuário registrado com sucesso');

});

 });

app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`);
}); 


