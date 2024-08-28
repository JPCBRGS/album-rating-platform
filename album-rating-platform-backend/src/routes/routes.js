const express = require('express');
const userRouter = require('./userRoutes');

const router = express.Router();

router.use('/users', userRouter);

router.get('/', (req, res) => {
    res.send('Hello, World!');
});

module.exports = router;
