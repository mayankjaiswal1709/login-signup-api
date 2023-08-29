const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User', required: true 
    },

  type: {
     type: String,
      required: true
     },
  url: {
     type: String,
      required: true
     },
});

module.exports = mongoose.model('Asset', assetSchema);
