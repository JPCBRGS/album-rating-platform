// routes/routes.js
const express = require('express');
const userRouter = require('./userRoutes');
const spotifyRouter = require('./spotifyRoutes');

const router = express.Router();

router.use('/users', userRouter);
router.use('/spotify', spotifyRouter);

router.get('/', (req, res) => {
    res.send('Server is running.');
});

module.exports = router;
