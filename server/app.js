const express = require('express');
const app = express(); 
const cors  = require('cors');
const crypto = require('node:crypto');
const pg = require('pg');
const bcrypt = require('bcrypt');

const { Pool } = pg;


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ecommerce',
    password: '',
    port: 5432,
});

const port = 3001;


app.use(express.json());
app.use(cors());

function criptografarSenha(senha) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(senha, salt);
}


app.post('/registro', (req, res) => {
  const { email, senha } = req.body;

  const senhaCriptografada = criptografarSenha(senha);


  const query = "INSERT INTO usuarios (email, senha, data_registro) VALUES ($1, $2, NOW())";

  pool.query(query, [email, senhaCriptografada], (error, result) => {
    if(error) {
      console.error(error);
      return res.status(400).send('Erro ao registrar usuário');
    }
    res.status(201).send('Usuário registrado com sucesso');
  });

  //const result = pool.query(query, [email, senhaCriptografada]);

  // if(result.rows.length === 0) {
  //   res.status(400).send('Usuário já cadastrado');
  // }
  // res.status(201).send('Usuário cadastrado com sucesso');


});



app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`);
}); 


