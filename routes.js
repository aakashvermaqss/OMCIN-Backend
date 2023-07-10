const express = require('express');
const router = express.Router();

// Middleware to log requests
const logger = (req, res, next) => {
  console.log('Request received:', req.url);
  next();
};

// Route handler for the detail page
router.get('/detail', (req, res) => {
  res.send('This is the detail page');
});

module.exports = { router, logger };
