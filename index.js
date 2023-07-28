const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const chemicalRoutes = require('./routes/chemicals');
const companyRoutes = require('./routes/company');
const employeeRoutes = require('./routes/employee');
const quotationRoutes = require('./routes/quotation');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chemicals', chemicalRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/quotations', quotationRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
