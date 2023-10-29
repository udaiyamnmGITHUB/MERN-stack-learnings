const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res)=> res.send('API is running from server hosted by Mr Udai '));

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));