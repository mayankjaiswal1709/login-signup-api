const easyinvoice = require('easyinvoice');
const fs = require('fs');
require('pdfjs-dist')

var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');



// Function to generate an invoice
function generateInvoice(invoiceData) {
  const currentDate = new Date().toLocaleString();


  var userId = localStorage.getItem("userId")

  var client = {
    "company": invoiceData.client.company,
    "address": userId,
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

module.exports = {
  generateInvoice,
};