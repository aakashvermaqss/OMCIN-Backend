const express = require('express');
const bodyParser = require('body-parser');
const { router, authMiddleware } = require('./routes/auth');

const app = express();
const port = 3000;

// Parse incoming request bodies
app.use(bodyParser.json());

// Routes
app.use('/api', router);

// Protected route example
app.get('/api/data', authMiddleware, (req, res) => {
  const { role } = req.user;
  
  // Check user role and return appropriate response
  if (role === 'Admin') {
    res.json({ message: 'Admin data' });
  } else if (role === 'Operator') {
    res.json({ message: 'Operator data' });
  } else if (role === 'Approver') {
    res.json({ message: 'Approver data' });
  } else if (role === 'Manager') {
    res.json({ message: 'Manager data' });
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
