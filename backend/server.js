require('dotenv').config()
const express = require('express');
const connectDB = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

connectDB();
app.use(express.json());

app.use('/api/user', require('./routes/userRoute'))
app.use('/api/products', require('./routes/productRoute'))
app.use(errorHandler);

app.listen(port, (req, res) => {
    console.log(`Server is listening on port ${port}`);
})