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

export default pool;