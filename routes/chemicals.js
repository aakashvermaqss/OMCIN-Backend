const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const connection = require('../db');


//middleware.authMiddleware
router.get('/getChemicals', (req, res) => {
  connection.query('SELECT * FROM chemicals', (err, results) => {
    if (err) {
      console.error('Error executing the query: ', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json(results);
  });
});

router.get('/searchChemicals/:searchData', (req, res) => {
  var searchTerm = req.params.searchData;
  const query = `
    SELECT *
    FROM chemicals
    WHERE 
    ChemicalName LIKE '%${searchTerm}%' OR
    Brand LIKE '%${searchTerm}%' OR
    CASNo LIKE '%${searchTerm}%' OR
    CATNo LIKE '%${searchTerm}%' OR
    Purity LIKE '%${searchTerm}%' OR
    Expiration LIKE '%${searchTerm}%' OR
    Traceability LIKE '%${searchTerm}%' OR
    ListPrice LIKE '%${searchTerm}%' OR
    SurchargePrice LIKE '%${searchTerm}%'
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

router.get('/getChemicalById/:chemicalId', (req, res) => {
  const ChemicalId = req.params.chemicalId;
  connection.query('SELECT * FROM chemicals WHERE ChemicalId =?', [ChemicalId], (err, results) => {
    if (err) {
      console.error('Error executing the query: ', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

router.put('/filterChemicals', (req, res) => {
  const SliderStartValue = req.body.SliderStartValue;
  const SliderEndValue= req.body.SliderEndValue;
  const Expiration= req.body.Expiration;
  const Currency= req.body.Currency;
  connection.query('SELECT * FROM chemicals WHERE ListPrice >= ? AND ListPrice <= ? AND Expiration = ?', [SliderStartValue, SliderEndValue, Expiration], (err, results) => {
    if (err) {
      console.error('Error executing the query: ', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

 



router.put('/putChemicals', (req, res) => {
  var chemicalsData = req.body;
  const values = chemicalsData.map((chemical) => [
    chemical.ChemicalName,
    chemical.Brand,
    chemical.CASNo,
    chemical.CATNo,
    chemical.Purity,
    chemical.Expiration,
    chemical.Traceability,
    chemical.ListPrice,
    chemical.SurchargePrice
  ]);
  connection.query('INSERT INTO chemicals (ChemicalName, Brand,CASNo,CATNo,Purity,Expiration,Traceability,ListPrice,SurchargePrice) VALUES ?', [values], (err, results) => {
    if (err) {
      console.error('Error executing the query: ', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});



router.put('/editChemicalById/:ChemicalId', (req, res) => {
  const chemicalId = req.params.ChemicalId;
  console.log(req.body);
  const updatedChemicalData = req.body; 

  const values = [
    updatedChemicalData.ChemicalName,
    updatedChemicalData.Brand,
    updatedChemicalData.CASNo,
    updatedChemicalData.CATNo,
    updatedChemicalData.Purity,
    updatedChemicalData.Expiration,
    updatedChemicalData.Traceability,
    updatedChemicalData.ListPrice,
    updatedChemicalData.SurchargePrice,
    chemicalId
  ];

  connection.query('UPDATE chemicals SET ChemicalName = ?, Brand = ?, CASNo = ?, CATNo = ?, Purity = ?, Expiration = ?, Traceability = ?, ListPrice = ?, SurchargePrice = ? WHERE ChemicalId = ?', values, (err, results) => {
    if (err) {
      console.error('Error executing the query: ', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});




router.delete('/deleteChemicals/:chemicalId', (req, res) => {
  const ChemicalId = req.params.chemicalId;
  connection.query('DELETE FROM chemicals WHERE ChemicalId =?', [ChemicalId], (err, results) => {
    if (err) {
      console.error('Error executing the query: ', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

module.exports = router;
