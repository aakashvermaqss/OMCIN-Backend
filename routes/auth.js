const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../db');

// Login API
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) throw err;
        console.log(results);
        // Check if user exists
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = results[0];
        console.log(user);

        // Compare password
        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate and return the JWT token
        const token = jwt.sign({ id: user.id, role: user.role }, 'your_secret_key');
        res.json({ token });

    });
});

// Authentication middleware
function authMiddleware(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Missing authorization token' });
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid authorization token' });
    }
}

module.exports = { router, authMiddleware };
