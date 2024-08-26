const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

// Endpoint para criar usuário
router.post('/create', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await userService.createUser(username, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Endpoint para verificar senha
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const isValid = await userService.verifyUserPassword(email, password);
    if (isValid) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
});

module.exports = router;
