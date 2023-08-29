const express = require("express");
require('dotenv').config()
require("./models/config");
const router = require('./routes/mainRoutes/mainRoutes')

const app = express();

app.use(express.json());

app.use("/", router); 

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server running on port ${process.env.PORT}`);
});
