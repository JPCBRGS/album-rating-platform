const axios = require('axios');
const querystring = require('querystring');
const { clientId, clientSecret, redirectUri } = require('../config/spotifyConfig');

exports.redirectToSpotify = (req, res) => {
    const scope = 'user-read-private user-read-email';
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    res.redirect(authUrl);
};

exports.handleSpotifyCallback = async (req, res) => {
    const code = req.query.code || null;

    if (code) {
        try {
            console.log('Session before storing access token:', req.session);

            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: redirectUri
                })
            });

            const data = await response.json();
            if (data.access_token) {
                req.session.accessToken = data.access_token;
                console.log('Access token stored in session:', req.session.accessToken);
                console.log('Session after storing access token:', req.session);
                res.status(200).send('Login successful! Access token acquired.');
            } else {
                res.send('Login failed! No access token returned.');
            }
        } catch (error) {
            console.error('Error in Spotify callback:', error);
            res.send('Error during the callback handling.');
        }
    } else {
        res.send('Error: No code received.');
    }
};

exports.searchAlbums = async (req, res) => {
    console.log(req.session.accessToken);

    const query = req.query.query; // Pega a query da URL
    const accessToken = req.session.accessToken; // Assume que o token está armazenado na sessão

    if (!accessToken) {
        return res.status(401).json({ error: 'Access Token is missing' });
    }

    try {
        const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album&limit=20`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error.message);
        }

        res.status(200).json(data.albums.items); // Envia os álbuns encontrados de volta ao cliente
    } catch (error) {
        console.error('Error searching albums:', error);
        res.status(500).json({ error: 'Failed to search albums' });
    }
};
