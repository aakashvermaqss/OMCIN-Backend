const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const connection = require('../db');

//apis

router.get('/getEmployees', (req, res) => {
    connection.query('SELECT * FROM employees', (err, results) => {
      if (err) {
        console.error('Error executing the query: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      res.json(results);
    });
  });

  router.put('/editEmployeeById/:EmployeeId', (req, res) => {
    const EmployeeId = req.params.EmployeeId;
    const updatedData = req.body; 
  
    const values = [
      updatedData.PhoneNo,
      updatedData.Department,
      updatedData.Role,
      updatedData.Status,
      EmployeeId
    ];
  
    connection.query('UPDATE employees SET PhoneNo = ?, Department = ?, Role = ?, Status = ? WHERE EmployeeId = ?', values, (err, results) => {
      if (err) {
        console.error('Error executing the query: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(results);
    });
  });
  
  router.delete('/deleteEmployee/:employeeId', (req, res) => {
    const EmployeeId = req.params.employeeId;
    connection.query('DELETE FROM employees WHERE EmployeeId =?', [EmployeeId], (err, results) => {
      if (err) {
        console.error('Error executing the query: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(results);
    });
  });

module.exports = router;


