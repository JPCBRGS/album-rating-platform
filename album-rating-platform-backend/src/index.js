require('dotenv').config({ path: '../.env' });

const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to the database', err);
    } else {
        console.log('Database connected:', res.rows[0]);
    }
});

app.get('/', (req, res) => {
    res.send('Server is running.');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
