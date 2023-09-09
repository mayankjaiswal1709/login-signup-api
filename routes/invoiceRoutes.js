const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser');
const invoiceController = require('../controllers/invoiceController');
const { isAdmin } = require('../middleware/authorization');

router.use(bodyParser.json());

// Router: Route to generate an invoice
router.post('/generate-invoice', async (req, res) => {
  try {
    // Get sender data, client data, and products data from the request body
    const data = req.body;
    // You can add validation here to ensure the data is provided correctly
    const result = await invoiceController.generateInvoice(data);
    res.status(200).json({
      success: true,
      message: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});




module.exports = router;