const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));
require('dotenv').config();
const errorHandler = require('./middleware/errorHandler.js');

const otp=require('./routes/otpRouter.js');

app.use('/api',otp);

const port = process.env.PORT || 3000;
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});