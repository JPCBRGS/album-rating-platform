const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const connectToDatabase = async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Database connected:', res.rows[0]);
    } catch (err) {
        console.error('Error connecting to the database', err);
    }
};

module.exports = {
    pool,
    connectToDatabase,
};
