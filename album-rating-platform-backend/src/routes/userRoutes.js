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

// Endpoint para atualizar usuário
router.put('/update', async (req, res) => {
  const { email, newUsername, newEmail, newPassword } = req.body;

  try {
    const updatedUser = await userService.updateUser(email, newUsername, newEmail, newPassword);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para obter o perfil do usuário
router.get('/profile', async (req, res) => {
  const { email } = req.query;  // Obtém o email a partir da query string

  try {
    const userProfile = await userService.getUserProfile(email);
    if (userProfile) {
      res.status(200).json(userProfile);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to load profile' });
  }
});

module.exports = router;
