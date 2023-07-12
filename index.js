const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const chemicalRoutes = require('./routes/chemicals');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chemicals', chemicalRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
