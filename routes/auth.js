const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../db');

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Error executing the query: ', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    console.log(results);

    // Check if user exists
    if (results.length === 0) {
        console.log("hiii");
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = results[0];

    // Compare password
    // bcrypt.compare(password, user.password, (err, isMatch) => {
    //   if (err) {
    //     console.error('Error comparing passwords: ', err);
    //     res.status(500).json({ error: 'Internal Server Error' });
    //     return;
    //   }

    //   if (!isMatch) {
    //     return res.status(401).json({ message: 'Invalid username or password' });
    //   }

      // Generate and return the JWT token
      const token = jwt.sign({ id: user.id, role: user.role }, 'your_secret_key');
      res.json({ token });
      console.log(token);
    });
  });

module.exports = router;
