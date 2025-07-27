const express = require('express');
const path=require('path');
const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index2.html'));
});

app.use(express.static('public'));
require('dotenv').config();
const errorHandler = require('./middleware/errorHandler.js');

const otp=require('./routes/otpRouter.js');
const register=require('./routes/userRouter.js');

app.use('/api',otp);
app.use('/register',register);

const port = process.env.PORT || 3000;
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});