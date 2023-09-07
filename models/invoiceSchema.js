
const mockDatabase = {
  sender: {
    "company": "IONINKS",
    "address": "visakhapatnam",
    "zip": "531022",
    "city": "visakhapatnam",
    "country": "India",
    "logo": "https://ioninks.com/wp-content/uploads/2022/07/ioninks_logo_white.png",
    "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
  },
  client:
    {
    "company": "mj",
    "address": "indore",
    "zip": "452001",
    "city": "indore",
    "country": "India"
  },
  products: [
    {
      "quantity": 1,
      "description": "Portfolio Website",
      "tax-rate": 5,
      "price": 5
    },
    {
      "quantity": 1,
      "description": "android app",
      "tax-rate": 5,
      "price": 5
    },
    {
      "quantity": 1,
      "description": "static Website",
      "tax-rate": 5,
      "price": 5
    }
  ]
};

module.exports = mockDatabase;