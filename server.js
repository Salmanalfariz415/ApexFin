const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));
require('dotenv').config();

const emailRoutes = require('./routes/sendotp.js');
const otpRoutes=require('./routes/otpcheck.js')
app.use('/api/send/email', emailRoutes);
app.use('/api/send/otp',otpRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});