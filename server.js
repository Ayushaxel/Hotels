const express = require("express");
const app = express();
const db = require("./db");
const personRoutes= require('./routes/personRoutes');
const menuRoutes=require('./routes/menuRouter');
const bodyParser = require("body-parser");
require('dotenv').config();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

app.get("/", (req, res) => {S
  res.send("Hello World!");
});









app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
