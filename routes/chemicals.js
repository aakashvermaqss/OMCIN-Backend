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



router.put('/putChemicals', (req, res) => {
  var chemicalsData = req.body;
  console.log(chemicalsData);
  const values = chemicalsData.map((chemical) => [
    chemical.ChemicalName,
    chemical.Brand,
    chemical.CASNo,
    chemical.CATNo,
    chemical.Purity,
    chemical.Expiration,
    chemical.Tracability,
    chemical.ListPrice,
    chemical.SurchargePrice
  ]);
  connection.query('INSERT INTO chemicals (ChemicalName, Brand,CASNo,CATNo,Purity,Expiration,Tracability,ListPrice,SurchargePrice) VALUES ?', [values], (err, results) => {
    if (err) {
      console.error('Error executing the query: ', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});



router.put('/editChemical/:id', (req, res) => {
  const chemicalId = req.params.id;
  const updatedChemical = req.body;
  connection.query('UPDATE chemicals SET ? WHERE id = ?', [updatedChemical, chemicalId], (err, results) => {
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
