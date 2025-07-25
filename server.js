const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));
require('dotenv').config();
const errorHandler=require('middleware/errorHandler.js')

const otp=require('otp.js');
const emailRoutes = require('./routes/sendotp.js');
const otpRoutes=require('./routes/otpcheck.js')
app.use('/api/send/email', emailRoutes);
app.use('/api/send/otp',otpRoutes);
app.use('/api/otp',otp);

const port = process.env.PORT || 3000;
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});