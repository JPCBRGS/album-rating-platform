const express = require('express');
const router = express.Router();
const ratingService = require('../services/ratingService');

// Rota para criar ou atualizar uma avaliação
router.post('/create-or-update', ratingService.createOrUpdateRating);

// Rota para buscar a avaliação de um álbum específico
router.get('/album/:spotifyAlbumId', ratingService.getAlbumRating);

module.exports = router;
