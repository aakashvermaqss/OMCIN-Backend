const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const connection = require('../db');

//apis

router.get('/getAllCompany', (req, res) => {
    connection.query('SELECT * FROM companies', (err, results) => {
        if (err) {
            console.error('Error executing the query: ', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.json(results);
    });
});

// CompanyId INT PRIMARY KEY AUTO_INCREMENT,
//   CompanyName  VARCHAR(255),
//   Address VARCHAR(255),
//   Country VARCHAR(255),
//   State VARCHAR(255),
//   City VARCHAR(255),
//   Zipcode VARCHAR(255),
//   GSTNo VARCHAR(255),
//   VATNo DECIMAL(10, 2),
//   CIN DECIMAL(10, 2),
//   Currency varchar(255));
  


router.get('/searchCompany/:searchData', (req, res) => {
    var searchTerm = req.params.searchData;
    const query = `
      SELECT *
      FROM companies
      WHERE 
      CompanyName LIKE '%${searchTerm}%' OR
      Address LIKE '%${searchTerm}%' OR
      Country LIKE '%${searchTerm}%' OR
      State LIKE '%${searchTerm}%' OR
      City LIKE '%${searchTerm}%' OR
      Zipcode LIKE '%${searchTerm}%' OR
      GSTNo LIKE '%${searchTerm}%' OR
      VATNo LIKE '%${searchTerm}%' OR
      CIN LIKE '%${searchTerm}%' OR
      Currency '%${searchTerm}%'
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing the query: ', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.json(results);
    });
});

router.get('/getCompanyById/:companyId', (req, res) => {
    const CompanyId = req.params.companyId;
    connection.query('SELECT * FROM companies WHERE CompanyId =?', [CompanyId], (err, results) => {
        if (err) {
            console.error('Error executing the query: ', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

router.put('/filterCompany', (req, res) => {
    const Year = req.body.Year;
    const Country = req.body.Country;
    const State = req.body.State;
    connection.query('SELECT * FROM companies WHERE Year >= ? AND Country <= ? AND State = ?', [Year, Country, State], (err, results) => {
        if (err) {
            console.error('Error executing the query: ', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

router.post('/addCompany', (req, res) => {
    const newCompanyData = req.body;

    const values = [
        newCompanyData.CompanyName,
        newCompanyData.Address,
        newCompanyData.Country,
        newCompanyData.State,
        newCompanyData.City,
        newCompanyData.Zipcode,
        newCompanyData.GSTNo,
        newCompanyData.VATNo,
        newCompanyData.CIN,
        newCompanyData.Currency,
    ];

    connection.query('INSERT INTO companies (CompanyName, Address, Country, State, City, Zipcode, GSTNo, VATNo, CIN, Currency) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', values, (err, results) => {
        if (err) {
            console.error('Error executing the query: ', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Company data inserted successfully!', insertedId: results.insertId });
    });
});

router.put('/editCompanyById/:companyId', (req, res) => {
    const CompanyId = req.params.companyId;
    const updatedCompanyData = req.body;

    const values = [
        updatedCompanyData.CompanyName,
        updatedCompanyData.Address,
        updatedCompanyData.Country,
        updatedCompanyData.State,
        updatedCompanyData.City,
        updatedCompanyData.Zipcode,
        updatedCompanyData.GSTNo,
        updatedCompanyData.VATNo,
        updatedCompanyData.CIN,
        updatedCompanyData.Currency,
        CompanyId
    ];

    connection.query('UPDATE companies SET CompanyName = ?, Address = ?, Country = ?, State = ?, City = ?, Zipcode = ?, GSTNo = ?, VATNo = ?, CIN = ?,Currency = ? WHERE CompanyId = ?', values, (err, results) => {
        if (err) {
            console.error('Error executing the query: ', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});




router.delete('/deleteCompany/:companyId', (req, res) => {
    const CompanyId = req.params.companyId;
    connection.query('DELETE FROM companies WHERE CompanyId =?', [CompanyId], (err, results) => {
        if (err) {
            console.error('Error executing the query: ', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});





module.exports = router;

