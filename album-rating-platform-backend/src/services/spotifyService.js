const fetch = require('node-fetch');
const { clientId, clientSecret } = require('../config/spotifyConfig');

exports.redirectToSpotify = (req, res) => {
    const scope = 'user-read-private user-read-email';
    res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent('http://localhost:3000/spotify/callback')}`);
  };

exports.handleSpotifyCallback = async (req, res) => {
    const code = req.query.code;
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
        'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'http://localhost:3000/spotify/callback'
        })
    });

    const data = await response.json();
    if (data.access_token) {
        res.redirect('/spotify/success');
    } else {
        res.redirect('/spotify/error');
    }
};
