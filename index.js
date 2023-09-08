const express = require("express");
const path = require('path')
require('dotenv').config()
require("./models/config");
const router = require('./routes/mainRoutes/mainRoutes')
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());


app.use("/", router); 


app.listen(process.env.PORT, (req, res) => {
  console.log(`Server running on port ${process.env.PORT}`);
});
