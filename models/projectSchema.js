const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // ref:"userData"
  },
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
  mobile_no: {
    type: String,
    required: [true,"Please Enter Mobile number "],
    maxLength:[10,"mobile no can not exceed 10 character "],
  },
  status: {
    type: String,

  },
});

projectSchema.set("timestamps", true);
module.exports = mongoose.model("Project", projectSchema);
