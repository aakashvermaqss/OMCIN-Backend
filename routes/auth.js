const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const connection = require('../db');
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Error executing the query: ', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const user = results[0];

    if (password === user.password) {
      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, secretKey, { expiresIn: '1h' });
      return res.status(200).json({ message: 'Login Succesful',token });
    }
    else
    {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});

module.exports = router;
