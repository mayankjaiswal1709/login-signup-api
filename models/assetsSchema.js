const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({

 
    asset_files: {
    type: String,
    requier: true,
  }

});

assetSchema.set("timestamps", true);
module.exports = mongoose.model("assets", assetSchema);
