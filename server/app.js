import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/routes.js';
import pool from './db.js';

dotenv.config();

const app = express();
app.use(routes);

app.get('/', (req, res) => {
    res.json('Hello World!');
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port http://localhost:${process.env.PORT}`);
});


