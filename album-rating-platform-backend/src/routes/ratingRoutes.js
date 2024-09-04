const express = require('express');
const router = express.Router();
const ratingService = require('../services/ratingService');

router.post('/create-or-update', ratingService.createOrUpdateRating);

router.get('/album/:spotifyAlbumId', ratingService.getAlbumRating);

router.get('/user-album-rating/:spotifyAlbumId/:email', ratingService.getUserAlbumRating);


module.exports = router;
