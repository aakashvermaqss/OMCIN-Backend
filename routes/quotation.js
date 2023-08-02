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

router.put('/addQuotation', (req, res) => {
    const quotationData = req.body;

    const values = [
        quotationData.QuotationNo,
        quotationData.SenderName,
        quotationData.SenderAddress,
        quotationData.GSTIN_UIN,
        quotationData.CIN,
        quotationData.SenderEmail,
        quotationData.BuyerName,
        quotationData.BuyerAddress1,
        quotationData.BuyerAddress2,
        quotationData.Tele,
        quotationData.BuyerEmail,
        quotationData.BuyerOrderNo,
        quotationData.DispatchDocumentationNo,
        quotationData.DispatchThrough,
        quotationData.Dated,
        quotationData.DeliveryNoteDate,
        quotationData.Destination,
        quotationData.SubTotal,
        quotationData.TotalDiscount,
        quotationData.SGST,
        quotationData.CGST,
        quotationData.GrandTotal
    ];

    connection.query('INSERT INTO quotationDetail (QuotationNo, SenderName, SenderAddress, GSTIN_UIN, CIN, SenderEmail, BuyerName, BuyerAddress1, BuyerAddress2, Tele, BuyerEmail, BuyerOrderNo, DispatchDocumentationNo, DispatchThrough, Dated, DeliveryNoteDate, Destination, SubTotal, TotalDiscount, SGST, CGST, GrandTotal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', values, (err, results) => {
        if (err) {
            console.error('Error executing the query: ', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

module.exports = router;
