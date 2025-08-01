const express = require('express');
const path=require('path');
const app = express();
app.use(express.json());
const { globalLimiter } = require('./middleware/limiter');
app.use(globalLimiter);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','dashboard','dashboard.html'));
});

app.use(express.static('public'));
require('dotenv').config();
const errorHandler = require('./middleware/errorHandler.js');

const otp=require('./routes/registerRouter.js');
const register=require('./routes/userRouter.js');
const login = require('./routes/loginRouter.js');

app.use('/api',otp);
app.use('/register',register);
app.use('/login',login);

const port = process.env.PORT || 3000;
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});