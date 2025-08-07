const express = require('express');
const path=require('path');
const app = express();
app.use(express.json());
const { globalLimiter } = require('./middleware/limiter');
app.use(globalLimiter);

//Assigning the first page
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','dashboard','dashboard.html'));
});

app.use(express.static('public'));
require('dotenv').config();
const errorHandler = require('./middleware/errorHandler.js');

const otp=require('./routes/registerRouter.js');
const register=require('./routes/userRouter.js');
const login = require('./routes/loginRouter.js');
const main=require('./routes/mainRouter.js')

app.use('/api',otp);
app.use('/register',register);
app.use('/login',login);
app.use('/main',main);

const port = process.env.PORT || 3000;
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});