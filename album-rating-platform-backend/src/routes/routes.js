// routes/routes.js
const express = require('express');
const userRouter = require('./userRoutes');
const spotifyRouter = require('./spotifyRoutes');
const ratingRouter = require('./ratingRoutes');

const router = express.Router();

router.use('/users', userRouter);
router.use('/spotify', spotifyRouter);
router.use('/ratings', ratingRouter);

router.get('/', (req, res) => {
    res.send('Server is running.');
});

module.exports = router;
