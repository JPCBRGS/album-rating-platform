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

                res.redirect(`http://localhost:8080/main?access_token=${data.access_token}`);
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
    const query = req.query.query; 
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }

    const accessToken = authHeader.split(' ')[1]; 

    if (!accessToken) {
        return res.status(401).json({ error: 'Access Token is missing' });
    }

    try {
        const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album&limit=20`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error.message);
        }

        res.status(200).json(data.albums.items); 
    } catch (error) {
        console.error('Error searching albums:', error);
        res.status(500).json({ error: 'Failed to search albums' });
    }
};

exports.verifyAccessToken = async (req, res) => {
    const accessToken = req.headers.authorization?.split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ valid: false, error: 'Access Token is missing' });
    }

    try {
        // Verifica o token fazendo uma chamada simples à API do Spotify (ex.: pegar informações do usuário)
        const response = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.status === 401) {
            // Token expirado ou inválido
            return res.status(401).json({ valid: false, error: 'Access Token expired' });
        }

        res.status(200).json({ valid: true }); // Token válido
    } catch (error) {
        console.error('Error verifying access token:', error);
        res.status(500).json({ valid: false, error: 'Failed to verify token' });
    }
};
