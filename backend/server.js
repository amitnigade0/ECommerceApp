require('dotenv').config()
const express = require('express');
const connectDB = require('./config/dbConnection');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

connectDB();
app.use(express.json());
app.use(cookieParser());
  
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend
  credentials: true, // Allow cookies to be sent
}));

app.use('/api/user', require('./routes/userRoute'))
app.use('/api/products', require('./routes/productRoute'))
app.use(errorHandler);

app.listen(port, (req, res) => {
    console.log(`Server is listening on port ${port}`);
})

module.exports = app;