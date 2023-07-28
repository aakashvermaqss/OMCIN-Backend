const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const connection = require('../db');


//middleware.authMiddleware
router.get('/getQuotations', (req, res) => {
  connection.query('SELECT * FROM quotations', (err, results) => {
    if (err) {
      console.error('Error executing the query: ', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

module.exports = router;
