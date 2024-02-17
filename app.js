
const express = require('express');
const app = express();
const connection = require('./config/db');
const port = 9000;
const router = require('./routes/workersRoutes.js');
app.use(express.json());
app.use("/api",router);
connection().then(()=>
app.listen(port, err => err ?  console.log(err):console.log(port)));