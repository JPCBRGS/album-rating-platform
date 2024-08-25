const express = require('express');
const { connectToDatabase } = require('./config/database');

const app = express();
const port = 3000;

connectToDatabase();

app.get('/', (req, res) => {
    res.send('Server is running.');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
