const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref:"userData"
  },
  project_name: {
    type: String,
    required: [true,"Please Enter Project Name "],
  },
  project_description: {
    type: String,
    required: [true,"Please Enter Project Description "],
  },
  project_price: {
    type: Number,
    required: [true,"Please Enter Project Price "],
  },
  project_categories: {
    type: String,
    required: [true,"Please Enter Project Categories "],
  },
  project_image: {
    type: String,
    required: [true,"Please Add Project Image "],
  },
  project_company: {
    type: String,
    required: [true,"Please Enter project company "],
  },
  mobile_no: {
    type: String,
    required: [true,"Please Enter Mobile number "],
    maxLength:[10,"mobile no. can not exceed 10 character "],
  },
  status: {
    type: String,

  },
});

projectSchema.set("timestamps", true);
module.exports = mongoose.model("Project", projectSchema);
