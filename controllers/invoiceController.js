const easyinvoice = require('easyinvoice');
const fs = require('fs');
// const path = require('path');
const InvoiceSchema = require('../models/invoiceSchema');
const clientSchema = require('../models/clientSchema');
const invoiceSchema = require('../models/invoiceSchema');
require('pdfjs-dist')

// var LocalStorage = require('node-localstorage').LocalStorage,
// localStorage = new LocalStorage('./scratch');



// Function to generate an invoice
const generateInvoice = async(invoiceData)=> {
  const currentDate = new Date().toLocaleString();
// console.log(invoiceData);

  // var userId = localStorage.getItem("userId")

  var client = {
    "company": invoiceData.client.company,
    "address": invoiceData.client.address,
    "zip": invoiceData.client.zip,
    "city":  invoiceData.client.city,
    "country": invoiceData.client.country 
   }
  
  const data = {
    "customize": {
      // "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
    },
    "images": {
      // "logo": senderData.logo,
      // "background": senderData.background
    },
    "sender": invoiceData.sender,
    "client": client,
    "information": {
      "number": Date.now(),
      "date": currentDate,
      "due-date": "",
    },
    "products": invoiceData.products,
    "bottom-notice": "Kindly pay your invoice within 10 days."
  };
  // console.log(data);
 const invoice = new InvoiceSchema(data)
 const invoiceDataa =  await invoice.save()


  return new Promise((resolve, reject) => {
    easyinvoice.createInvoice(data, async function (result) {
      try {
        const timestamp = Date.now();
        const pdfFileName = `invoice_${timestamp}.pdf`;

        await fs.writeFileSync(pdfFileName, result.pdf, 'base64')
        console.log(pdfFileName);

        const invoice = new InvoiceSchema({
          ...data,
          path: pdfFileName, // Store the PDF path in the database
        });
        await invoice.save();

        resolve({
          message:"Invoice generated successfully",
          pdfPath:pdfFileName,
        });
  
      } catch (error) {
        reject(error);
      }
    });
  });
}

const genrateInvoiceController = async (req, res) => {
  try {
    // Get sender data, client data, and products data from the request body
    const data = req.body;
    // You can add validation here to ensure the data is provided correctly
    const result = await generateInvoice(data);

    res.setHeader('Content-Disposition', `attachment; filename="${result.pdfPath}"`);

    res.status(200).json({
      success: true,
      message: result.message,
      pdfPath: result.pdfPath
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.stack,
    });
  }
}

// get all invoice ==========================================
const getAllInvoice = async (req, res) => {
  try {

    const allInvoice = await InvoiceSchema.find({  });
    if (allInvoice) {
      res.status(200).json({
        success: true,
        message: "all Invoice list below",
        InvoiceList: allInvoice,
      });
    } else {
      res.status(404)({
        success: false,
        message: "no Invoice found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// get invoice by id==================================================
const getInvoicebyId = async (req, res) => {
  try {
    const { _id } = req.params;
    const allInvoice = await InvoiceSchema.find({ _id });
    if (allInvoice) {
      res.status(200).json({
        success: true,
        message: "all Project list below",
        InvoiceList: allInvoice,
      });
    } else {
      res.status(404)({
        success: false,
        message: "no Project found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


const getAllInvoiceByClientId = async (req, res) => {
  try {

    const clientId = req.params.cid; 
    // console.log(clientId);
    const allInvoice = await InvoiceSchema.find({'client.company':clientId});
  
    if (allInvoice) {
      res.status(200).json({
        success: true,
        message: "all Invoice list below1",
        InvoiceList: allInvoice,
      });
    } else {
      res.status(404)({
        success: false,
        message: "no Invoice found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


module.exports = {
  generateInvoice,
  genrateInvoiceController,
  getAllInvoice,
  getInvoicebyId,
  getAllInvoiceByClientId
};