const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'ecommerce',
  password: '',
  port: 5432,
});

async function createUsersTable() {
  try {
    await client.connect();
    const query = `
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
    `;
    await client.query(query);
    console.log('Users table created successfully');
  } catch (err) {
    console.error('Error creating users table', err);
  } finally {
    await client.end();
  }
}

createUsersTable();