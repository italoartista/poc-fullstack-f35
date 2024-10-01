const express = require('express');
const app = express(); 
const cors  = require('cors');
const crypto = require('node:crypto');
const pg = require('pg');

const { Pool } = pg;


const client = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ecommerce',
    password: '',
    port: 5432,
  });

const port = 3001;


app.use(express.json());
app.use(cors());

app.post('/registro', (req, res) => {
  



});


app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`);
}); 


