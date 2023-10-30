const express = require('express');
const connectDB = require('./config/db');

const app = express();

// connect DB
connectDB();

//Init middleware

app.use(express.json({extended: false}))

// Define Routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profiles'));
app.use('/api/post', require('./routes/api/post'));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res)=> res.send('API is running from server hosted by Mr Udai '));

app.listen(PORT, ()=> console.log(`Server (hosted by Mr Udai) started on port ${PORT}`));