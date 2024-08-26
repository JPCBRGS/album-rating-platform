const express = require('express');
const { connectToDatabase } = require('./config/database');
const userRouter = require('./routes/userRoutes');

const app = express();
const port = 3000;

app.use(express.json());

connectToDatabase();

app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
