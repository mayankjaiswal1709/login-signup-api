const express = require("express");
const path = require('path')
require('dotenv').config()
require("./models/config");
const router = require('./routes/mainRoutes/mainRoutes')
var bodyParser = require("body-parser");
const cors = require("cors");
var multer = require('multer');
var upload = multer();
const app = express();

app.use(upload.array()); 


app.use(express.json());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/", router); 


app.listen(process.env.PORT, (req, res) => {
  console.log(`Server running on port ${process.env.PORT}`);
});
