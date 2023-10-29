const express = require('express');
const connectDB = require('./config/db');

const app = express();

// connect DB
connectDB();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res)=> res.send('API is running from server hosted by Mr Udai '));

app.listen(PORT, ()=> console.log(`Server (hosted by Mr Udai) started on port ${PORT}`));