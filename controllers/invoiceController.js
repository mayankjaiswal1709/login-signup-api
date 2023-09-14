const easyinvoice = require('easyinvoice');
const fs = require('fs');
const InvoiceSchema = require('../models/invoiceSchema');
require('pdfjs-dist')

// var LocalStorage = require('node-localstorage').LocalStorage,
// localStorage = new LocalStorage('./scratch');



// Function to generate an invoice
const generateInvoice= async(invoiceData)=> {
  const currentDate = new Date().toLocaleString();
console.log(invoiceData);

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
//  console.log(invoiceDataa);


  // const randomNumber = Math.random() * 1000000; 
  return new Promise((resolve, reject) => {
    easyinvoice.createInvoice(data, async function (result) {
      try {
        await fs.writeFileSync("invoice.pdf", result.pdf, 'base64');

        // result.pdf = result.pdf.replace("INVOICE_NUMBER", randomNumber.toString());
        resolve("Invoice generated successfully");
  
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
    res.status(200).json({
      success: true,
      message: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.stack,
    });
  }
}


const getAllInvoice = async (req, res) => {
  try {

    const allInvoice = await InvoiceSchema.find({  });
    if (allInvoice) {
      res.status(200).json({
        success: true,
        message: "all Invoice list below",
        ProjectList: allInvoice,
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
  getAllInvoice
};