import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: 'localhost',  
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

const query = await pool.query('SELECT NOW()');
if (query) {
    console.log('Connected to the database');
}

const query2 = await pool.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY,username CHARACTER VARYING(50) NOT NULL,password CHARACTER VARYING(255) NOT NULL,email CHARACTER VARYING(100) NOT NULL,UNIQUE (email),UNIQUE (username));');

const query1 = await pool.query('CREATE TABLE IF NOT EXISTS tasks (id SERIAL PRIMARY KEY,user_id INTEGER NOT NULL,task TEXT NOT NULL,completed BOOLEAN DEFAULT FALSE,created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY (user_id) REFERENCES users(id));');

if (query1 && query2) {
    console.log('Tables created successfully');
}

export default pool;