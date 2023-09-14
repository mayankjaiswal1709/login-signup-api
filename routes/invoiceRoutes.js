const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser');
const invoiceController = require('../controllers/invoiceController');
const { isAdmin } = require('../middleware/authorization');

router.use(bodyParser.json());

// Router: Route to generate an invoice
router.post('/generate-invoice' ,invoiceController.genrateInvoiceController );
router.get('/getallinvoice' ,invoiceController.getAllInvoice);




module.exports = router;