const express = require('express');
const router = express.Router();
const spotifyService = require('../services/spotifyService');

router.get('/login', spotifyService.redirectToSpotify);
router.get('/callback', spotifyService.handleSpotifyCallback);
router.get('/success', (req, res) => res.send('Successfully logged in with Spotify.'));
router.get('/error', (req, res) => res.send('Error logging in with Spotify.'));
router.get('/search-albums', spotifyService.searchAlbums);
router.get('/verify-token', spotifyService.verifyAccessToken);

module.exports = router;
