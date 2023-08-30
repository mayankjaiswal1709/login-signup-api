const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    
  project_name: {
    type: String,
    require: true,
  },
  project_description: {
    type: String,
    require: true,
  },
  project_price: {
    type: Number,
    require: true,
  },
  project_categories: {
    type: String,
    require: true,
  },
  project_image: {
    type: String,
    requier: true,
  },
  project_company: {
    type: String,
    require: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

projectSchema.set("timestamps", true);
module.exports = mongoose.model("Project", projectSchema);
