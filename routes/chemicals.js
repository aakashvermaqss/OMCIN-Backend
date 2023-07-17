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
