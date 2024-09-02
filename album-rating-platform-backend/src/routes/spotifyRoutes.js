// routes/spotifyRoutes.js
const express = require('express');
const router = express.Router();
const spotifyService = require('../services/spotifyService');

// Rota para redirecionar para a autenticação do Spotify
router.get('/login', spotifyService.redirectToSpotify);

// Rota de callback após a autenticação com o Spotify
router.get('/callback', spotifyService.handleSpotifyCallback);

// Rota de sucesso
router.get('/success', (req, res) => {
    res.send('Login com Spotify foi bem sucedido!'); // Você pode modificar isso para renderizar uma página ou redirecionar para uma parte segura do seu app
});

// Rota de erro
router.get('/error', (req, res) => {
    res.send('Falha ao realizar login com Spotify.'); // Similarmente, você pode fornecer feedback ou ações de correção
});

module.exports = router;
